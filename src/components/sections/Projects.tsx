import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderGit2, ExternalLink, Github, Sparkles, CheckCircle2, X, Eye } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types/portfolio';

const CATEGORIES = ['All', 'Featured', 'Embedded & IoT', 'Full Stack', 'AI/ML'] as const;

export const Projects: React.FC = () => {
  const { data } = usePortfolio();
  const projectsList = data.projects || [];
  const [activeTab, setActiveTab] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projectsList.filter(
    (proj) => activeTab === 'All' || proj.category === activeTab || (activeTab === 'Featured' && proj.featured)
  );

  return (
    <section id="projects" className="relative py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] font-mono text-xs uppercase tracking-widest mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>04 // FEATURED WORKS</span>
          </div>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            Crafted <span className="text-gradient-orange">Projects.</span>
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 bg-[#1B1B1B]/80 p-1.5 rounded-2xl border border-zinc-800">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
                activeTab === cat
                  ? 'bg-[#FF6B00] text-black font-bold shadow-[0_0_15px_rgba(255,107,0,0.4)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass-card rounded-3xl overflow-hidden border border-zinc-800 hover:border-[#FF6B00]/50 transition-all duration-500 group flex flex-col justify-between relative shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {/* Top Image Preview Container */}
            <div className="relative h-52 w-full overflow-hidden bg-zinc-900">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />

              {/* Top Category Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D0D0D]/80 backdrop-blur-md border border-[#FF6B00]/40 font-mono text-[10px] text-[#FF6B00] uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>{project.category}</span>
              </div>

              {/* Metrics Badge */}
              {project.metrics && (
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF3B30] font-mono text-[10px] font-bold text-black uppercase tracking-wider shadow-[0_0_15px_rgba(255,107,0,0.5)]">
                  {project.metrics}
                </div>
              )}
            </div>

            {/* Content Container */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-2xl text-white mb-2 group-hover:text-[#FF6B00] transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center gap-1.5 mb-6">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-[#1B1B1B] border border-zinc-800 text-[11px] font-mono text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 font-mono text-xs">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-1.5 text-zinc-300 hover:text-[#FF6B00] transition group/btn"
                >
                  <Eye className="w-4 h-4 text-[#FF6B00]" />
                  <span>Inspect Details</span>
                </button>

                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#1B1B1B] hover:bg-[#FF6B00] hover:text-black text-zinc-300 transition"
                    title="View Source on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF3B30] text-black font-bold transition shadow-[0_0_15px_rgba(255,107,0,0.4)]"
                      title="Launch Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Inspection Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl glass-panel rounded-3xl p-8 border border-[#FF6B00]/40 shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] font-mono text-xs uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{selectedProject.category}</span>
              </div>

              <h3 className="font-heading font-extrabold text-3xl text-white mb-3">
                {selectedProject.title}
              </h3>

              <div className="w-full h-64 rounded-2xl overflow-hidden mb-6 border border-zinc-800">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-zinc-300 text-sm font-light leading-relaxed mb-6">
                {selectedProject.longDescription}
              </p>

              <div className="mb-6">
                <div className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-3">
                  Key Innovations
                </div>
                <div className="space-y-2 font-mono text-xs text-zinc-300">
                  {selectedProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#1B1B1B] border border-zinc-800">
                      <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Modal Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800">
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-zinc-800 text-[11px] font-mono text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 text-white font-mono text-xs hover:bg-zinc-700 transition"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF3B30] text-black font-bold font-mono text-xs shadow-[0_0_20px_rgba(255,107,0,0.5)] hover:brightness-110 transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live App</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
