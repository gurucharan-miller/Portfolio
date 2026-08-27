import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Code2, FileCode2, Code, Cpu, Binary, Atom, Layers, Palette, Server, Sparkles, BarChart3, ShieldCheck, Terminal, GitBranch, Wrench,
  Database, Zap, BrainCircuit, HardDrive, Boxes, Activity, Wifi, Radio, Layout
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Code2,
  FileCode2,
  Code,
  Cpu,
  Binary,
  Atom,
  Layers,
  Palette,
  Server,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Terminal,
  GitBranch,
  Database,
  Zap,
  BrainCircuit,
  HardDrive,
  Boxes,
  Activity,
  Wifi,
  Radio,
  Layout
};

const CATEGORIES = ['All', 'Languages', 'Frontend', 'Backend', 'Databases', 'AI/ML', 'Embedded & IoT', 'Tools'] as const;

export const Skills: React.FC = () => {
  const { data } = usePortfolio();
  const skillsList = data.skills || [];
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredSkills = skillsList.filter(
    (skill) => activeCategory === 'All' || skill.category === activeCategory
  );

  return (
    <section id="skills" className="relative py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Background Accent */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] font-mono text-xs uppercase tracking-widest mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>02 // SKILLS & TECH STACK</span>
          </div>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            Technical <span className="text-gradient-orange">Capabilities.</span>
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-[#1B1B1B]/80 p-1.5 rounded-2xl border border-zinc-800">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#FF6B00] text-black font-bold shadow-[0_0_15px_rgba(255,107,0,0.4)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, index) => {
          const IconComponent = ICON_MAP[skill.iconName] || Code2;

          return (
            <motion.div
              key={skill.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{
                y: -8,
                rotateX: 4,
                rotateY: -4,
                scale: 1.02,
              }}
              className="glass-card rounded-2xl p-6 border border-zinc-800 hover:border-[#FF6B00]/50 hover:shadow-[0_15px_30px_rgba(255,107,0,0.15)] transition-all duration-300 relative group overflow-hidden"
            >
              {/* Subtle Corner Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#FF6B00]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl bg-[#1B1B1B] border border-[#FF6B00]/30 text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-black transition-colors duration-300 shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="font-mono text-sm font-bold text-gradient-orange">
                  {skill.proficiency}%
                </div>
              </div>

              <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:text-[#FF6B00] transition-colors">
                {skill.name}
              </h3>

              <p className="text-zinc-400 text-xs leading-relaxed font-light mb-4 h-10 line-clamp-2">
                {skill.description}
              </p>

              {/* Animated Proficiency Meter */}
              <div className="w-full bg-[#1B1B1B] h-1.5 rounded-full overflow-hidden border border-zinc-800">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FF3B30] rounded-full shadow-[0_0_10px_#FF6B00]"
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                <span>{skill.category}</span>
                <span className="text-[#FF6B00]">{skill.proficiency >= 90 ? 'EXPERT' : 'ADVANCED'}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

