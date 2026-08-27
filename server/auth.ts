import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { pool, initDb } from './db';

// Load environment variables from .env file
dotenv.config();

// Strictly require JWT_SECRET from environment variables — no hardcoded fallbacks
const rawJwtSecret = process.env.JWT_SECRET?.trim();
if (!rawJwtSecret) {
  throw new Error(
    'FATAL CONFIGURATION ERROR: JWT_SECRET environment variable is missing. ' +
    'Please define JWT_SECRET in your .env file or environment variables before starting the server.'
  );
}
const JWT_SECRET: string = rawJwtSecret;

interface StoredCredentials {
  username: string;
  passwordHash: string;
  updatedAt: string;
}

// Default initial credentials if not configured in env
const DEFAULT_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'Guru@Admin2028!';

// Rate limiting state for brute force protection: 5 attempts -> 15 min lockout
interface AttemptRecord {
  count: number;
  lastAttempt: number;
  lockedUntil: number;
}
const loginAttempts = new Map<string, AttemptRecord>();
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export async function getAdminCredentials(): Promise<StoredCredentials> {
  await initDb();

  const result = await pool.query(
    'SELECT username, password_hash, updated_at FROM admin_credentials WHERE id = 1'
  );

  if (result.rows.length > 0) {
    const row = result.rows[0];
    return {
      username: row.username,
      passwordHash: row.password_hash,
      updatedAt: row.updated_at
    };
  }

  // Seed default admin credentials on first run
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(DEFAULT_PASSWORD, salt);

  await pool.query(
    `INSERT INTO admin_credentials (id, username, password_hash, updated_at)
     VALUES (1, $1, $2, now())
     ON CONFLICT (id) DO NOTHING`,
    [DEFAULT_USERNAME, passwordHash]
  );

  return {
    username: DEFAULT_USERNAME,
    passwordHash,
    updatedAt: new Date().toISOString()
  };
}

export async function updateAdminPassword(newPassword: string, newUsername?: string): Promise<boolean> {
  await initDb();

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(newPassword, salt);
  const current = await getAdminCredentials();

  await pool.query(
    `INSERT INTO admin_credentials (id, username, password_hash, updated_at)
     VALUES (1, $1, $2, now())
     ON CONFLICT (id) DO UPDATE SET username = $1, password_hash = $2, updated_at = now()`,
    [newUsername || current.username, passwordHash]
  );

  return true;
}

export function checkRateLimit(ip: string): { isLocked: boolean; remainingSeconds: number; attemptsLeft: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record) {
    return { isLocked: false, remainingSeconds: 0, attemptsLeft: MAX_FAILED_ATTEMPTS };
  }

  // Check if currently locked out
  if (record.lockedUntil > now) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { isLocked: true, remainingSeconds, attemptsLeft: 0 };
  }

  // If lockout expired or more than 15 mins since last attempt, reset
  if (now - record.lastAttempt > LOCKOUT_DURATION_MS) {
    loginAttempts.delete(ip);
    return { isLocked: false, remainingSeconds: 0, attemptsLeft: MAX_FAILED_ATTEMPTS };
  }

  const attemptsLeft = Math.max(0, MAX_FAILED_ATTEMPTS - record.count);
  return { isLocked: false, remainingSeconds: 0, attemptsLeft };
}

export function recordFailedAttempt(ip: string): { isLocked: boolean; remainingSeconds: number; attemptsLeft: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, lastAttempt: now, lockedUntil: 0 };

  record.count += 1;
  record.lastAttempt = now;

  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
    loginAttempts.set(ip, record);
    return { isLocked: true, remainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000), attemptsLeft: 0 };
  }

  loginAttempts.set(ip, record);
  return { isLocked: false, remainingSeconds: 0, attemptsLeft: MAX_FAILED_ATTEMPTS - record.count };
}

export function resetFailedAttempts(ip: string): void {
  loginAttempts.delete(ip);
}

export function verifyPassword(plainText: string, hash: string): boolean {
  return bcrypt.compareSync(plainText, hash);
}

export function generateToken(username: string): string {
  return jwt.sign(
    { username, role: 'admin' },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyToken(token: string): { username: string; role: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string; role: string };
    return decoded;
  } catch (err) {
    return null;
  }
}

export interface AuthenticatedRequest extends Request {
  user?: { username: string; role: string };
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  // Check cookie or Authorization header
  const token = req.cookies?.admin_token || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired session' });
  }

  req.user = payload;
  next();
}
