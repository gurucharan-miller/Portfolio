import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Github, GitCommit, GitPullRequest, Star, Flame, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const GithubStats: React.FC = () => {
  const { data } = usePortfolio();
  const personalInfo = data.personalInfo;
  const githubStats = data.githubStats || {
    totalCommits: 520,
    pullRequests: 42,
    starsEarned: 135,
    contributionsThisYear: 410,
    currentStreak: 28
  };

  const [visitorCount, setVisitorCount] = useState<number>(1284);

  useEffect(() => {
    const savedCount = localStorage.getItem('mg_portfolio_visitors');
    let current = savedCount ? parseInt(savedCount, 10) : 1284;
    current += 1;
    localStorage.setItem('mg_portfolio_visitors', current.toString());
    setVisitorCount(current);
  }, []);

  // Generate 52 weeks of GitHub contribution matrix
  const weeks = 52;
  const daysPerWeek = 7;
  const contributionGrid = React.useMemo(() => {
    const grid: number[][] = [];
    for (let w = 0; w < weeks; w++) {
      const weekDays: number[] = [];
      for (let d = 0; d < daysPerWeek; d++) {
        // Higher activity in recent weeks
        const rand = Math.random();
        if (rand > 0.75) weekDays.push(4); // Max activity
        else if (rand > 0.5) weekDays.push(3);
        else if (rand > 0.3) weekDays.push(2);
        else if (rand > 0.15) weekDays.push(1);
        else weekDays.push(0);
      }
      grid.push(weekDays);
    }
    return grid;
  }, []);

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 4: return 'bg-[#FF6B00] shadow-[0_0_8px_#FF6B00]';
      case 3: return 'bg-[#FF6B00]/80';
      case 2: return 'bg-[#FF6B00]/50';
      case 1: return 'bg-[#FF6B00]/25';
      default: return 'bg-[#1B1B1B] border border-zinc-800';
    }
  };

  return (
    <section id="github-stats" className="relative py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6B00]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] font-mono text-xs uppercase tracking-widest mb-3">
            <Github className="w-3.5 h-3.5" />
            <span>07 // OPEN SOURCE ACTIVITY</span>
          </div>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            Code & <span className="text-gradient-orange">Contributions.</span>
          </h2>
        </div>

        {/* Live Visitor Badge */}
        <div className="glass-card px-4 py-2.5 rounded-2xl border border-[#FF6B00]/40 flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF6B00]"></span>
          </div>
          <div className="font-mono text-xs">
            <span className="text-zinc-400">TOTAL VISITORS: </span>
            <span className="text-gradient-orange font-bold text-sm">{visitorCount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Github Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-6 rounded-2xl border border-zinc-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00]">
            <GitCommit className="w-6 h-6" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              {githubStats.totalCommits}+
            </div>
            <div className="font-mono text-xs text-zinc-400">Total Commits</div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-zinc-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-[#FF3B30]">
            <GitPullRequest className="w-6 h-6" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              {githubStats.pullRequests}
            </div>
            <div className="font-mono text-xs text-zinc-400">Pull Requests</div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-zinc-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              {githubStats.starsEarned}
            </div>
            <div className="font-mono text-xs text-zinc-400">Stars Earned</div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-zinc-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00]">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-gradient-orange">
              {githubStats.currentStreak} Days
            </div>
            <div className="font-mono text-xs text-zinc-400">Current Streak</div>
          </div>
        </div>
      </div>

      {/* GitHub Contribution Heatmap Canvas */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-zinc-800 overflow-x-auto">
        <div className="flex items-center justify-between mb-6 min-w-[600px]">
          <div className="flex items-center gap-2 font-heading font-bold text-lg text-white">
            <Sparkles className="w-5 h-5 text-[#FF6B00]" />
            <span>{githubStats.contributionsThisYear || 395} Contributions in the last year</span>
          </div>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#FF6B00] hover:underline flex items-center gap-1"
          >
            <span>GitHub Profile</span>
          </a>
        </div>

        {/* Heatmap Grid */}
        <div className="flex gap-1.5 min-w-[700px] justify-between">
          {contributionGrid.map((week, wIndex) => (
            <div key={wIndex} className="flex flex-col gap-1.5">
              {week.map((level, dIndex) => (
                <motion.div
                  key={dIndex}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: wIndex * 0.005 }}
                  className={`w-3.5 h-3.5 rounded-sm transition-all duration-300 hover:scale-125 ${getHeatmapColor(
                    level
                  )}`}
                  title={`Level ${level} activity`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800/80 font-mono text-xs text-zinc-400 min-w-[600px]">
          <span>Jan</span>
          <span>Apr</span>
          <span>Jul</span>
          <span>Oct</span>
          <span>Dec</span>
          <div className="flex items-center gap-2 text-[11px]">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-[#1B1B1B] border border-zinc-800 rounded-sm" />
              <div className="w-3 h-3 bg-[#FF6B00]/25 rounded-sm" />
              <div className="w-3 h-3 bg-[#FF6B00]/50 rounded-sm" />
              <div className="w-3 h-3 bg-[#FF6B00]/80 rounded-sm" />
              <div className="w-3 h-3 bg-[#FF6B00] rounded-sm" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
};

