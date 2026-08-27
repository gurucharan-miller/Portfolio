import React from 'react';
import { motion } from 'motion/react';
import { MapPin, GraduationCap, Target, Sparkles, UserCheck } from 'lucide-react';
import { CubesScene } from '../3d/CubesScene';
import { usePortfolio } from '../../context/PortfolioContext';

export const About: React.FC = () => {
  const { data } = usePortfolio();
  const personalInfo = data.personalInfo;
  const interests = personalInfo.interests || [];

  return (
    <section id="about" className="relative py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* 3D Wireframe Cubes Canvas Background */}
      <CubesScene />

      {/* Section Header */}
      <div className="relative z-10 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] font-mono text-xs uppercase tracking-widest mb-3">
          <UserCheck className="w-3.5 h-3.5" />
          <span>01 // ABOUT ME</span>
        </div>
        <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
          Pioneering Code <span className="text-gradient-orange">& AI Interfaces.</span>
        </h2>
      </div>

      {/* Main Glass Card Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side - Profile Glass Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 glass-card rounded-3xl p-8 border border-[#FF6B00]/30 flex flex-col items-center justify-between relative overflow-hidden group shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
        >
          {/* Ambient Background Radial */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#FF6B00]/20 rounded-full blur-[80px] pointer-events-none" />

          {/* Avatar Graphic with Glowing Aura */}
          <div className="relative my-6 w-full flex justify-center">
            <div className="w-56 h-64 sm:w-64 sm:h-72 rounded-3xl p-1 bg-gradient-to-tr from-[#FF6B00] via-[#FF3B30] to-amber-500 shadow-[0_0_40px_rgba(255,107,0,0.35)] group-hover:shadow-[0_0_60px_rgba(255,107,0,0.65)] transition-all duration-500 relative">
              <div className="w-full h-full rounded-[22px] bg-[#0A0A0A] relative overflow-hidden flex flex-col items-center justify-center border border-zinc-800">
                {personalInfo.avatarUrl ? (
                  <>
                    <img
                      src={personalInfo.avatarUrl}
                      alt={personalInfo.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top filter contrast-110 brightness-105 group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Ambient cyber overlay glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Bottom Name Card on top of photo */}
                    <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-[#FF6B00]/30 text-center">
                      <div className="font-heading font-bold text-sm text-white uppercase tracking-wider truncate">
                        {personalInfo.name}
                      </div>
                      <div className="font-mono text-[10px] text-[#FF6B00] uppercase tracking-wider truncate">
                        {personalInfo.title}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-[#1B1B1B] border border-[#FF6B00]/40 flex items-center justify-center font-heading font-extrabold text-4xl text-gradient-orange mb-3 shadow-[0_0_20px_rgba(255,107,0,0.3)]">
                      GC
                    </div>
                    <div className="font-heading font-bold text-lg text-white text-center uppercase">
                      {personalInfo.name}
                    </div>
                    <div className="font-mono text-xs text-[#FF6B00] uppercase tracking-wider text-center mt-1">
                      {personalInfo.title}
                    </div>
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div className="absolute -top-3 right-3 px-2.5 py-1 rounded-full bg-black/90 border border-[#FF6B00]/60 text-[10px] font-mono text-[#FF8533] uppercase tracking-wider flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-ping" />
                <span>CYBER_ID // VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="w-full grid grid-cols-2 gap-3 mt-4 pt-6 border-t border-zinc-800/80 font-mono text-xs">
            <div className="p-3 rounded-xl bg-[#1B1B1B]/80 border border-zinc-800 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF6B00] shrink-0" />
              <div>
                <div className="text-zinc-500 text-[10px]">LOCATION</div>
                <div className="text-zinc-200 font-medium truncate">{personalInfo.location}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#1B1B1B]/80 border border-zinc-800 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#FF3B30] shrink-0" />
              <div>
                <div className="text-zinc-500 text-[10px]">DEGREE</div>
                <div className="text-zinc-200 font-medium truncate">B.E. CSE '28</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Bio & Objective Details */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Bio Glass Card */}
          <div className="glass-card rounded-3xl p-8 border border-zinc-800 relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF6B00] uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4" />
              <span>THE ARCHITECTURE OF MY WORK</span>
            </div>
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-light mb-6">
              {personalInfo.bio}
            </p>

            {/* Career Objective */}
            <div className="p-5 rounded-2xl bg-[#1B1B1B]/90 border border-[#FF6B00]/30 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/40 text-[#FF6B00] shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-1">
                  Career Objective
                </div>
                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                  {personalInfo.careerObjective}
                </p>
              </div>
            </div>
          </div>

          {/* Technical Pillars / Interests */}
          <div className="glass-card rounded-3xl p-8 border border-zinc-800">
            <div className="font-heading font-bold text-lg text-white mb-4 flex items-center justify-between">
              <span>Core Areas of Expertise</span>
              <span className="font-mono text-xs text-[#FF6B00]">{interests.length} DOMAINS</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {interests.map((interest, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#1B1B1B] border border-zinc-800 hover:border-[#FF6B00]/50 hover:bg-[#FF6B00]/5 transition duration-300 flex items-center gap-2 text-xs font-mono text-zinc-300"
                >
                  <div className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                  <span>{interest}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

