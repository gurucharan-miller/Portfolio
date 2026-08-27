import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, ShieldCheck, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Experience: React.FC = () => {
  const { data } = usePortfolio();
  const experienceList = data.experience || [];

  return (
    <section id="experience" className="relative py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#FF3B30]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] font-mono text-xs uppercase tracking-widest mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>03 // EXPERIENCE & INTERNSHIPS</span>
        </div>
        <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
          Industry <span className="text-gradient-orange">Experience.</span>
        </h2>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative pl-6 md:pl-10 border-l-2 border-[#FF6B00]/30 space-y-12">
        {experienceList.map((exp, index) => (
          <motion.div
            key={exp.id || index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline Pulsing Node */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#0D0D0D] border-2 border-[#FF6B00] flex items-center justify-center shadow-[0_0_15px_#FF6B00]">
              <div className="w-2 h-2 rounded-full bg-[#FF6B00] animate-ping" />
            </div>

            {/* Experience Glass Card */}
            <div className="glass-card rounded-3xl p-8 border border-zinc-800 hover:border-[#FF6B00]/40 transition duration-300 relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] font-mono text-xs mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{exp.type}</span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white group-hover:text-[#FF6B00] transition-colors">
                    {exp.title}
                  </h3>
                  <div className="text-zinc-300 font-semibold text-lg">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-col items-start sm:items-end font-mono text-xs text-zinc-400 gap-1">
                  <div className="flex items-center gap-1.5 text-[#FF6B00] font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-zinc-300 text-sm md:text-base font-light leading-relaxed mb-6">
                {exp.description}
              </p>

              {/* Responsibilities Bullet Grid */}
              <div className="mb-6">
                <div className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF6B00]" />
                  <span>Key Responsibilities</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exp.responsibilities.map((resp, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#1B1B1B]/80 border border-zinc-800 flex items-start gap-2.5 text-xs text-zinc-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements Highlight */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FF6B00]/10 to-transparent border border-[#FF6B00]/30 mb-6">
                <div className="font-heading font-bold text-xs text-[#FF6B00] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>Key Achievements</span>
                </div>
                <ul className="list-disc list-inside text-xs text-zinc-300 space-y-1 font-light">
                  {exp.achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              </div>

              {/* Technologies Pill Strip */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-zinc-800 font-mono text-xs">
                <span className="text-zinc-500 text-[11px]">STACK LEARNED:</span>
                {exp.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-[#1B1B1B] text-zinc-300 border border-zinc-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
