import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download, Mail, Github, Linkedin, Sparkles, Terminal, ChevronDown } from 'lucide-react';
import { HeroScene } from '../3d/HeroScene';
import { usePortfolio } from '../../context/PortfolioContext';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const { data } = usePortfolio();
  const personalInfo = data.personalInfo;
  const typingRoles = personalInfo.typingRoles && personalInfo.typingRoles.length > 0
    ? personalInfo.typingRoles
    : ['Full-Stack Developer', 'AI & IoT Builder', 'AI & CS Engineer'];

  // Typing animation state
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = typingRoles[roleIndex % typingRoles.length] || 'AI & CS Engineer';
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % typingRoles.length);
      } else {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        );
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, typingRoles]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Split name for high-contrast typography
  const nameParts = personalInfo.name.split(' ');
  const firstName = nameParts[0] || 'GURU';
  const lastName = nameParts.slice(1).join(' ') || 'CHARAN';

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-4 md:px-8 lg:px-12 overflow-hidden"
    >
      {/* 3D Particle Universe Canvas */}
      <HeroScene />

      {/* Cyber Grid & Ambient Radial Glows */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-40 z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#FF6B00]/10 to-[#FF3B30]/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Cybernetic Holographic Profile Avatar Orbital Element */}
      <div className="absolute top-1/2 right-10 lg:right-20 -translate-y-1/2 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px] border border-[#FF6B00]/25 rounded-full pointer-events-none z-0 hidden md:flex items-center justify-center">
        <div className="absolute inset-4 border border-[#FF6B00]/15 rounded-full animate-[spin_30s_linear_infinite]"></div>
        <div className="absolute inset-12 border border-[#FF6B00]/20 rounded-full border-dashed animate-[spin_40s_linear_infinite_reverse]"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF6B00]/40 to-transparent rotate-12"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF6B00]/40 to-transparent -rotate-45"></div>
        
        {/* Profile Avatar Card in Center */}
        {personalInfo.avatarUrl && (
          <div className="relative w-44 h-56 lg:w-56 lg:h-72 rounded-2xl p-1 bg-gradient-to-b from-[#FF6B00]/60 via-[#FF3B30]/30 to-transparent backdrop-blur-md shadow-[0_0_50px_rgba(255,107,0,0.3)] overflow-hidden">
            <div className="w-full h-full rounded-[14px] bg-black/80 overflow-hidden relative border border-[#FF6B00]/30">
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top opacity-90 filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-black/70 border border-[#FF6B00]/40 text-center font-mono text-[9px] text-[#FF8533] uppercase tracking-wider">
                CORE_NODE // GURUCHARAN
              </div>
            </div>
          </div>
        )}

        <div className="absolute top-8 right-16 w-3 h-3 bg-[#FF6B00] rounded-full shadow-[0_0_20px_#FF6B00] animate-pulse"></div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto flex flex-col items-start pt-6">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono mb-6 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B00]"></span>
          </span>
          <span className="text-zinc-300 font-medium tracking-wider uppercase text-[11px]">
            {personalInfo.statusBadge || 'AVAILABLE FOR INTERNSHIPS & FREELANCE ROLES'}
          </span>
        </motion.div>

        {/* Portfolio Tag */}
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-8 bg-[#FF6B00]"></span>
          <span className="text-xs font-mono text-[#FF6B00] tracking-[0.2em] font-semibold uppercase">
            {personalInfo.title}
          </span>
        </div>

        {/* Large Name Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-white mb-3 leading-[0.85] uppercase italic"
        >
          {firstName}<br /><span className="text-[#FF6B00]">{lastName}</span>
        </motion.h1>

        {/* Dynamic Typing Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-2 font-mono text-lg sm:text-xl md:text-2xl text-zinc-300 mb-6 h-10 mt-2"
        >
          <Terminal className="w-5 h-5 text-[#FF6B00] shrink-0" />
          <span className="text-gradient-orange font-semibold">{displayText}</span>
          <span className="w-2 h-5 bg-[#FF6B00] animate-pulse inline-block" />
        </motion.div>

        {/* Subheading Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-2xl text-sm sm:text-base text-zinc-400 font-light leading-relaxed mb-10"
        >
          {personalInfo.subheading}
        </motion.p>

        {/* Geometric Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
        >
          {/* Primary View Projects */}
          <button
            onClick={() => scrollToSection('projects')}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#FF6B00] text-black font-heading font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_25px_rgba(255,107,0,0.4)]"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Download Resume */}
          <button
            onClick={onOpenResumeModal}
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#1B1B1B]/60 text-white font-heading font-bold text-xs uppercase tracking-widest border border-white/10 hover:border-[#FF6B00] hover:bg-white/5 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md"
          >
            <Download className="w-4 h-4 text-[#FF6B00]" />
            <span>Download CV</span>
          </button>

          {/* Contact Me */}
          <button
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/5 text-zinc-300 hover:text-white font-heading font-bold text-xs uppercase tracking-widest border border-white/10 hover:border-white/30 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md"
          >
            <Mail className="w-4 h-4 text-[#FF3B30]" />
            <span>Contact Me</span>
          </button>
        </motion.div>

        {/* Social Icons Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center gap-4 mt-12 pt-6 border-t border-zinc-800/80 font-mono text-xs text-zinc-400"
        >
          <span className="text-[#FF6B00] font-semibold">CONNECT:</span>
          {personalInfo.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition group"
            >
              <Github className="w-4 h-4 text-zinc-400 group-hover:text-[#FF6B00] transition-colors" />
              <span>GitHub</span>
            </a>
          )}
          {personalInfo.linkedin && (
            <>
              <span className="text-zinc-700">•</span>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition group"
              >
                <Linkedin className="w-4 h-4 text-zinc-400 group-hover:text-[#FF6B00] transition-colors" />
                <span>LinkedIn</span>
              </a>
            </>
          )}
          {personalInfo.email && (
            <>
              <span className="text-zinc-700">•</span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-1.5 hover:text-white transition group"
              >
                <Mail className="w-4 h-4 text-zinc-400 group-hover:text-[#FF3B30] transition-colors" />
                <span className="hidden sm:inline">{personalInfo.email}</span>
                <span className="sm:hidden">Email</span>
              </a>
            </>
          )}
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 flex flex-col items-center justify-center pt-8 text-zinc-500 font-mono text-xs"
      >
        <button
          onClick={() => scrollToSection('about')}
          className="flex flex-col items-center gap-2 hover:text-[#FF6B00] transition group"
        >
          <span className="tracking-widest uppercase text-[10px]">SCROLL DOWN</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#FF6B00]" />
        </button>
      </motion.div>
    </section>
  );
};

