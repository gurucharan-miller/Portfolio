import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Calendar, Award, CheckCircle2, BookOpen } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Education: React.FC = () => {
  const { data } = usePortfolio();
  const educationList = data.education || [];

  return (
    <section id="education" className="relative py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#FF6B00]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] font-mono text-xs uppercase tracking-widest mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>05 // ACADEMIC TIMELINE</span>
        </div>
        <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
          Education & <span className="text-gradient-orange">Foundations.</span>
        </h2>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 md:pl-10 border-l-2 border-zinc-800 space-y-12">
        {educationList.map((edu, index) => (
          <motion.div
            key={edu.id || index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline Node */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#0D0D0D] border-2 border-[#FF6B00] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#FF6B00]" />
            </div>

            {/* Glass Card */}
            <div className="glass-card rounded-3xl p-8 border border-zinc-800 hover:border-[#FF6B00]/40 transition duration-300 relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white group-hover:text-[#FF6B00] transition-colors">
                    {edu.degree}
                  </h3>
                  <div className="text-zinc-300 font-semibold text-base mt-1">
                    {edu.institution}
                  </div>
                </div>

                <div className="flex flex-col items-start sm:items-end font-mono text-xs text-zinc-400 gap-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00] text-black font-bold font-heading text-xs">
                    <Award className="w-3.5 h-3.5" />
                    <span>{edu.score}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>{edu.period}</span>
                  </div>
                </div>
              </div>

              <p className="text-zinc-300 text-sm font-light leading-relaxed mb-6">
                {edu.details}
              </p>

              {/* Highlights */}
              <div className="space-y-2">
                <div className="font-heading font-bold text-xs text-[#FF6B00] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Academic Highlights</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-xs text-zinc-300">
                  {edu.highlights.map((h, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-[#1B1B1B] border border-zinc-800 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

