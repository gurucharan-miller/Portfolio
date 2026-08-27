import express, { Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

// Load environment variables early
dotenv.config();

import {
  getAdminCredentials,
  updateAdminPassword,
  checkRateLimit,
  recordFailedAttempt,
  resetFailedAttempts,
  verifyPassword,
  generateToken,
  verifyToken,
  requireAuth,
  AuthenticatedRequest
} from './server/auth';
import {
  getPortfolioData,
  savePortfolioData,
  resetPortfolioData
} from './server/storage';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize admin credentials and seed data
  getAdminCredentials();
  getPortfolioData();

  app.use(express.json({ limit: '10mb' }));
  app.use(cookieParser());

  // Trust proxy for rate limiting if behind reverse proxy
  app.set('trust proxy', 1);

  // Helper to extract IP
  const getClientIp = (req: Request) => {
    return (
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      '127.0.0.1'
    );
  };

  // ==================== AUTH & SECURITY APIS ====================

  // Check login rate limit status before attempting login
  app.get('/api/auth/status', (req: Request, res: Response) => {
    const ip = getClientIp(req);
    const rateStatus = checkRateLimit(ip);
    res.json({
      isLocked: rateStatus.isLocked,
      remainingSeconds: rateStatus.remainingSeconds,
      attemptsLeft: rateStatus.attemptsLeft
    });
  });

  // Single admin login
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const ip = getClientIp(req);
    const rateStatus = checkRateLimit(ip);

    if (rateStatus.isLocked) {
      return res.status(429).json({
        error: `Too many failed login attempts. Account temporarily locked for ${Math.ceil(
          rateStatus.remainingSeconds / 60
        )} more minute(s).`,
        isLocked: true,
        remainingSeconds: rateStatus.remainingSeconds
      });
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const admin = getAdminCredentials();

    // Verify username and bcrypt hashed password
    const isUsernameMatch = username.trim() === admin.username;
    const isPasswordMatch = isUsernameMatch && verifyPassword(password, admin.passwordHash);

    if (!isPasswordMatch) {
      const attempt = recordFailedAttempt(ip);
      if (attempt.isLocked) {
        return res.status(429).json({
          error: 'Too many failed login attempts. Account locked for 15 minutes.',
          isLocked: true,
          remainingSeconds: attempt.remainingSeconds,
          attemptsLeft: 0
        });
      }
      return res.status(401).json({
        error: 'Invalid username or password',
        isLocked: false,
        attemptsLeft: attempt.attemptsLeft
      });
    }

    // Success: reset failed attempts
    resetFailedAttempts(ip);

    // Generate JWT token (expires in 24 hours)
    const token = generateToken(admin.username);

    // Set secure HTTP-only cookie
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.json({
      success: true,
      token,
      user: {
        username: admin.username,
        role: 'admin'
      }
    });
  });

  // Current auth status check
  app.get('/api/auth/me', (req: Request, res: Response) => {
    const token = req.cookies?.admin_token || req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ authenticated: false });
    }

    const user = verifyToken(token);
    if (!user) {
      return res.status(401).json({ authenticated: false });
    }

    res.json({
      authenticated: true,
      user: {
        username: user.username,
        role: user.role
      }
    });
  });

  // Logout - clears session cookie
  app.post('/api/auth/logout', (req: Request, res: Response) => {
    res.clearCookie('admin_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    res.json({ success: true, message: 'Logged out successfully' });
  });

  // Update password (Protected)
  app.post('/api/admin/change-password', requireAuth, (req: AuthenticatedRequest, res: Response) => {
    const { currentPassword, newPassword, newUsername } = req.body;

    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters long' });
    }

    const admin = getAdminCredentials();
    if (currentPassword && !verifyPassword(currentPassword, admin.passwordHash)) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    updateAdminPassword(newPassword, newUsername);

    // Issue refreshed token
    const refreshedToken = generateToken(newUsername || admin.username);
    res.cookie('admin_token', refreshedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      message: 'Credentials updated successfully',
      token: refreshedToken
    });
  });

  // ==================== PORTFOLIO CONTENT APIS ====================

  // Public: Get portfolio content
  app.get('/api/portfolio', (req: Request, res: Response) => {
    const data = getPortfolioData();
    res.json(data);
  });

  // Protected: Save portfolio content
  app.put('/api/portfolio', requireAuth, (req: AuthenticatedRequest, res: Response) => {
    const incomingData = req.body;

    if (!incomingData || !incomingData.personalInfo) {
      return res.status(400).json({ error: 'Invalid portfolio data payload' });
    }

    const success = savePortfolioData(incomingData);
    if (!success) {
      return res.status(500).json({ error: 'Failed to save portfolio data to storage' });
    }

    res.json({
      success: true,
      message: 'Portfolio content saved successfully',
      data: incomingData
    });
  });

  // Protected: Reset portfolio content to seed data
  app.post('/api/portfolio/reset', requireAuth, (req: AuthenticatedRequest, res: Response) => {
    const resetData = resetPortfolioData();
    res.json({
      success: true,
      message: 'Portfolio content reset to default successfully',
      data: resetData
    });
  });

  // ==================== VITE SPA & STATIC SERVING ====================

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running on port ${PORT}`);
  });
}

startServer();
