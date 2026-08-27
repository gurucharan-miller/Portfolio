import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, FileText, Mail, Phone, MapPin } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { data } = usePortfolio();
  const personalInfo = data.personalInfo;
  const skillsData = data.skills || [];
  const experienceData = data.experience || [];
  const educationData = data.education || [];

  const handleDownload = () => {
    // Generate simple downloadable text / HTML resume trigger
    const content = `
${personalInfo.name} — RESUME
${personalInfo.title}
Email: ${personalInfo.email} | Location: ${personalInfo.location}
GitHub: ${personalInfo.github} | LinkedIn: ${personalInfo.linkedin}

SUMMARY:
${personalInfo.bio}

CAREER OBJECTIVE:
${personalInfo.careerObjective}

EDUCATION:
${educationData.map(e => `${e.degree} - ${e.institution} (${e.period}) - ${e.score}`).join('\n')}

PROJECTS & EXPERIENCE:
${experienceData.map(exp => `${exp.title} at ${exp.company} (${exp.period})\nResponsibilities:\n- ${exp.responsibilities.join('\n- ')}`).join('\n\n')}

TECHNICAL SKILLS:
${skillsData.map(s => `${s.name} (${s.category}): ${s.proficiency}%`).join(', ')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${personalInfo.name.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl glass-panel rounded-3xl p-6 sm:p-10 border border-[#FF6B00]/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-10 my-8 max-h-[85vh] overflow-y-auto text-zinc-200"
        >
          {/* Top Bar Actions */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00]">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-2xl text-white">
                  Curriculum Vitae
                </h3>
                <div className="font-mono text-xs text-zinc-400">
                  {personalInfo.name} // {personalInfo.title}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF3B30] text-black font-heading font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:brightness-110 transition"
              >
                <Download className="w-4 h-4" />
                <span>Save Resume</span>
              </button>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume Document Structure */}
          <div className="space-y-8 text-sm">
            {/* Header Identity */}
            <div className="p-6 rounded-2xl bg-[#1B1B1B] border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-heading font-bold text-3xl text-white mb-1">
                  {personalInfo.name}
                </h2>
                <div className="font-mono text-xs text-[#FF6B00] tracking-wider uppercase">
                  {personalInfo.title}
                </div>
              </div>

              <div className="font-mono text-xs text-zinc-400 space-y-1">
                {personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#FF3B30]" />
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Objective */}
            <div>
              <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider text-[#FF6B00] mb-2">
                Executive Profile
              </h4>
              <p className="text-zinc-300 font-light leading-relaxed">
                {personalInfo.bio}
              </p>
            </div>

            {/* Education */}
            <div>
              <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider text-[#FF6B00] mb-3">
                Education
              </h4>
              <div className="space-y-3">
                {educationData.map((e) => (
                  <div key={e.id} className="p-4 rounded-xl bg-[#1B1B1B]/80 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="font-heading font-bold text-base text-white">{e.degree}</div>
                      <div className="text-xs text-zinc-400">{e.institution}</div>
                    </div>
                    <div className="font-mono text-xs text-right">
                      <div className="text-[#FF6B00] font-bold">{e.score}</div>
                      <div className="text-zinc-500">{e.period}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider text-[#FF6B00] mb-3">
                Professional Experience & Projects
              </h4>
              <div className="space-y-3">
                {experienceData.map((exp) => (
                  <div key={exp.id} className="p-4 rounded-xl bg-[#1B1B1B]/80 border border-zinc-800 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-heading font-bold text-base text-white">{exp.title}</div>
                        <div className="text-xs text-zinc-400">{exp.company} — {exp.location}</div>
                      </div>
                      <div className="font-mono text-xs text-[#FF6B00]">{exp.period}</div>
                    </div>
                    <ul className="list-disc list-inside text-xs text-zinc-300 space-y-1 font-light">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills Summary */}
            <div>
              <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider text-[#FF6B00] mb-3">
                Core Technical Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillsData.map((s) => (
                  <span key={s.id} className="px-3 py-1 rounded-lg bg-[#1B1B1B] border border-zinc-800 font-mono text-xs text-zinc-300">
                    {s.name} <span className="text-[#FF6B00]">({s.proficiency}%)</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

