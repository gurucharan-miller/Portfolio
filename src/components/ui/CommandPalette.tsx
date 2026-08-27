import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Moon, Sun, Download, Mail, Github, Linkedin, Sparkles, User, Code2, Briefcase, GraduationCap, Award, MessageSquare, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolio } from '../../context/PortfolioContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onOpenResume }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const { data } = usePortfolio();
  const personalInfo = data.personalInfo;
  const certificatesData = data.certificates || [];

  const commands = [
    {
      id: 'sec-home',
      label: 'Go to Hero / Home',
      category: 'Navigation',
      icon: Sparkles,
      action: () => scrollToSection('hero')
    },
    {
      id: 'sec-about',
      label: 'Go to About Me',
      category: 'Navigation',
      icon: User,
      action: () => scrollToSection('about')
    },
    {
      id: 'sec-skills',
      label: 'Go to Skills & Tech Stack',
      category: 'Navigation',
      icon: Code2,
      action: () => scrollToSection('skills')
    },
    {
      id: 'sec-projects',
      label: 'Go to Featured Projects',
      category: 'Navigation',
      icon: Briefcase,
      action: () => scrollToSection('projects')
    },
    {
      id: 'sec-experience',
      label: 'Go to Projects & Experience',
      category: 'Navigation',
      icon: Briefcase,
      action: () => scrollToSection('experience')
    },
    {
      id: 'sec-education',
      label: 'Go to Education Timeline',
      category: 'Navigation',
      icon: GraduationCap,
      action: () => scrollToSection('education')
    },
    ...(certificatesData && certificatesData.length > 0 ? [
      {
        id: 'sec-certificates',
        label: 'Go to Certificates',
        category: 'Navigation',
        icon: Award,
        action: () => scrollToSection('certificates')
      }
    ] : []),
    {
      id: 'sec-contact',
      label: 'Go to Contact Section',
      category: 'Navigation',
      icon: MessageSquare,
      action: () => scrollToSection('contact')
    },
    {
      id: 'action-resume',
      label: 'View & Download Resume',
      category: 'Actions',
      icon: Download,
      action: () => {
        onOpenResume();
        onClose();
      }
    },
    {
      id: 'action-theme',
      label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      category: 'Actions',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        toggleTheme();
        onClose();
      }
    },
    ...(personalInfo.github ? [
      {
        id: 'action-github',
        label: 'Open GitHub Profile',
        category: 'Links',
        icon: Github,
        action: () => window.open(personalInfo.github, '_blank')
      }
    ] : []),
    ...(personalInfo.linkedin ? [
      {
        id: 'action-linkedin',
        label: 'Open LinkedIn Profile',
        category: 'Links',
        icon: Linkedin,
        action: () => window.open(personalInfo.linkedin, '_blank')
      }
    ] : []),
    ...(personalInfo.email ? [
      {
        id: 'action-email',
        label: `Copy Email (${personalInfo.email})`,
        category: 'Actions',
        icon: Mail,
        action: () => {
          navigator.clipboard.writeText(personalInfo.email);
          onClose();
        }
      }
    ] : [])
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9000] flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl glass-panel rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#FF6B00]/30 z-10"
        >
          {/* Search Header */}
          <div className="flex items-center px-4 py-3 border-b border-[#2E2E2E]">
            <Search className="w-5 h-5 text-[#FF6B00] mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDownList}
              placeholder="Type a command or section name... (e.g. Projects, Theme)"
              className="w-full bg-transparent text-sm font-mono text-white focus:outline-none placeholder:text-zinc-500"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Command List */}
          <div className="max-h-80 overflow-y-auto p-2 font-mono text-xs">
            {filteredCommands.length === 0 ? (
              <div className="py-8 text-center text-zinc-500">
                No matching commands found.
              </div>
            ) : (
              filteredCommands.map((cmd, index) => {
                const Icon = cmd.icon;
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={cmd.id}
                    onClick={cmd.action}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition text-left my-0.5 ${
                      isSelected
                        ? 'bg-[#FF6B00]/20 text-white border border-[#FF6B00]/40'
                        : 'text-zinc-300 hover:bg-zinc-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-1.5 rounded-lg ${
                          isSelected ? 'bg-[#FF6B00] text-black' : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{cmd.label}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 bg-zinc-900/60 px-2 py-0.5 rounded border border-zinc-800">
                      {cmd.category}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2 border-t border-[#2E2E2E] bg-zinc-900/40 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
            <div className="flex items-center gap-3">
              <span><kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700 text-zinc-300">↑↓</kbd> navigate</span>
              <span><kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700 text-zinc-300">↵</kbd> select</span>
              <span><kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700 text-zinc-300">esc</kbd> close</span>
            </div>
            <div className="text-[#FF6B00]">M.Gurucharan</div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
