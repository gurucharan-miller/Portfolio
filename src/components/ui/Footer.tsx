import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const personalInfo = data.personalInfo;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-zinc-800/80 bg-[#0D0D0D] py-12 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto font-mono text-xs text-zinc-400">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side Logo & Tag */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1B1B1B] border border-[#FF6B00]/40 flex items-center justify-center font-heading font-extrabold text-lg text-gradient-orange">
            GC
          </div>
          <div>
            <div className="font-heading font-bold text-sm text-white uppercase">
              {personalInfo.name}
            </div>
            <div className="text-[11px] text-zinc-500">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </div>
          </div>
        </div>

        {/* Center Tech Badge */}
        <div className="flex items-center gap-1.5 text-zinc-500">
          <span>Engineered with</span>
          <span className="text-[#FF3B30]">React 19</span>
          <span>&</span>
          <span className="text-[#FF6B00]">Three.js</span>
        </div>

        {/* Right Side Social & Back to Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {personalInfo.github && (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-[#1B1B1B] hover:bg-[#FF6B00] hover:text-black text-zinc-300 transition"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-[#1B1B1B] hover:bg-[#FF6B00] hover:text-black text-zinc-300 transition"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {personalInfo.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2 rounded-xl bg-[#1B1B1B] hover:bg-[#FF3B30] hover:text-black text-zinc-300 transition"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF3B30] text-black font-bold shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:brightness-110 active:scale-95 transition-all"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

