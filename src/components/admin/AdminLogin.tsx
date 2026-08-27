import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, User, KeyRound, ShieldCheck, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onGoHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onGoHome }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);

  // Check rate limit status on mount
  useEffect(() => {
    fetch('/api/auth/status')
      .then((res) => res.json())
      .then((data) => {
        if (data.isLocked) {
          setIsLocked(true);
          setRemainingSeconds(data.remainingSeconds);
        } else if (data.attemptsLeft !== undefined && data.attemptsLeft < 5) {
          setAttemptsLeft(data.attemptsLeft);
        }
      })
      .catch(() => {});
  }, []);

  // Lockout countdown timer
  useEffect(() => {
    if (!isLocked || remainingSeconds <= 0) return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsLocked(false);
          setError(null);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLocked, remainingSeconds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim() || isLocked) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username.trim(), password: password.trim() })
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.isLocked) {
          setIsLocked(true);
          setRemainingSeconds(data.remainingSeconds || 900);
          setError(`Account locked due to 5 failed attempts. Please wait ${Math.ceil((data.remainingSeconds || 900) / 60)} minutes.`);
        } else {
          setError(data.error || 'Invalid credentials');
          if (data.attemptsLeft !== undefined) {
            setAttemptsLeft(data.attemptsLeft);
          }
        }
        setLoading(false);
        return;
      }

      // Success
      setLoading(false);
      onLoginSuccess();
    } catch (err: any) {
      setError(err?.message || 'Connection error. Please try again.');
      setLoading(false);
    }
  };

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 selection:bg-[#FF6B00] selection:text-black">
      {/* Background Radial Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(255,107,0,0.12),transparent_70%)]" />

      {/* Return Button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={onGoHome}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#FF6B00] transition-colors py-2 px-3 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-[#FF6B00]/40"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>PORTFOLIO SITE</span>
        </button>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-[#121212] border border-zinc-800 rounded-2xl p-8 shadow-2xl relative z-10"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1B1B1B] border border-[#FF6B00]/40 flex items-center justify-center text-[#FF6B00]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-base text-white tracking-tight">
                PORTFOLIO ADMIN
              </h1>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                SECURE AUTHENTICATION GATEWAY
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
            <ShieldCheck className="w-3 h-3" />
            <span>BCRYPT + JWT</span>
          </div>
        </div>

        {/* Lockout Warning Banner */}
        {isLocked && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-red-200">Access Temporarily Locked</div>
              <p className="text-red-300/80 text-[11px] mt-0.5">
                5 consecutive failed attempts detected. Cooldown remaining:{' '}
                <span className="font-mono font-bold text-red-300">{formatCountdown(remainingSeconds)}</span>
              </p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && !isLocked && (
          <div className="mb-6 p-3 rounded-xl bg-red-950/30 border border-red-500/20 text-red-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <div>{error}</div>
              {attemptsLeft !== null && attemptsLeft > 0 && attemptsLeft < 5 && (
                <div className="text-[11px] text-zinc-400 mt-1 font-mono">
                  {attemptsLeft} attempt(s) remaining before 15-min lockout.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Admin Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLocked || loading}
                placeholder="Enter username"
                required
                autoComplete="username"
                className="w-full pl-10 pr-4 py-3 bg-[#181818] border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] disabled:opacity-50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLocked || loading}
                placeholder="Enter admin password"
                required
                autoComplete="current-password"
                className="w-full pl-10 pr-4 py-3 bg-[#181818] border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] disabled:opacity-50 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLocked || loading || !username.trim() || !password.trim()}
            className="w-full mt-2 py-3 px-4 bg-[#FF6B00] hover:bg-[#FF8533] disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-[#FF6B00]/10 hover:shadow-[#FF6B00]/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : isLocked ? (
              <span>Locked ({formatCountdown(remainingSeconds)})</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Security Note */}
        <div className="mt-8 pt-4 border-t border-zinc-800/80 text-center">
          <p className="text-[11px] text-zinc-500 font-mono leading-relaxed">
            Protected with server-side bcrypt password hashing, rate-limiting & 24h HTTP-only sessions.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
