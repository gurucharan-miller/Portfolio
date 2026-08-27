import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIATING ENGINE...');

  useEffect(() => {
    const textSequence = [
      'INITIATING ENGINE...',
      'LOADING 3D VECTOR GRAPHICS...',
      'COMPILING CYBER SECURITY SUITE...',
      'OPTIMIZING NEURAL PIPELINE...',
      'SYSTEM READY.'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 2;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setStatusText(textSequence[4]);
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 600);
      } else {
        setProgress(current);
        if (current > 80) setStatusText(textSequence[3]);
        else if (current > 50) setStatusText(textSequence[2]);
        else if (current > 25) setStatusText(textSequence[1]);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[10000] bg-[#0D0D0D] flex flex-col justify-between p-8 md:p-16 select-none overflow-hidden"
      >
        {/* Background Grid Accent */}
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
        
        {/* Ambient Orange Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-[#a1a1aa] z-10">
          <div className="flex items-center gap-2 text-[#FF6B00]">
            <Terminal className="w-4 h-4 animate-pulse" />
            <span>M.GURUCHARAN // PORTFOLIO</span>
          </div>
          <div>B.TECH AI & DATA SCIENCE</div>
        </div>

        {/* Center Logo & Progress */}
        <div className="flex flex-col items-center justify-center my-auto z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
          >
            <div className="w-24 h-24 rounded-2xl bg-[#1B1B1B] border border-[#FF6B00]/40 flex items-center justify-center shadow-[0_0_50px_rgba(255,107,0,0.3)]">
              <span className="font-heading font-extrabold text-4xl text-gradient-orange">MG</span>
            </div>
            <Sparkles className="absolute -top-3 -right-3 w-6 h-6 text-[#FF6B00] animate-bounce" />
          </motion.div>

          {/* Large Numerical Percentage */}
          <div className="font-heading font-bold text-6xl md:text-8xl text-white tracking-tighter mb-4">
            {progress}<span className="text-[#FF6B00] text-4xl md:text-6xl">%</span>
          </div>

          <div className="font-mono text-xs md:text-sm text-[#FF6B00] tracking-widest uppercase mb-8 h-6">
            {statusText}
          </div>

          {/* Progress Bar Track */}
          <div className="w-full max-w-md h-1.5 bg-[#1B1B1B] rounded-full overflow-hidden border border-[#2E2E2E]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FF3B30] rounded-full shadow-[0_0_15px_#FF6B00]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Bottom Specs */}
        <div className="flex items-center justify-between text-xs font-mono text-[#52525b] z-10">
          <span>LATITUDE: 12.9716° N</span>
          <span>LONGITUDE: 77.5946° E</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
