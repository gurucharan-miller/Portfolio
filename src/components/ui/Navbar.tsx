import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Search, FileText, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolio } from '../../context/PortfolioContext';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResumeModal: () => void;
}

const BASE_NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette, onOpenResumeModal }) => {
  const { theme, toggleTheme } = useTheme();
  const { data } = usePortfolio();
  const personalInfo = data.personalInfo;
  const certificates = data.certificates || [];

  const navItems = BASE_NAV_ITEMS.filter(
    (item) => item.id !== 'certificates' || certificates.length > 0
  );

  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll hide/show and section observer
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Section observer for active indicator
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-4 inset-x-0 z-[8000] px-4 md:px-8 max-w-7xl mx-auto pointer-events-none"
      >
        <div className="bg-[#1B1B1B]/60 backdrop-blur-xl rounded-full px-5 py-2.5 flex items-center justify-between pointer-events-auto border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-8 h-8 border-2 border-[#FF6B00] rounded-lg flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform duration-500">
              <span className="-rotate-45 font-bold text-xs text-[#FF6B00]">GC</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-heading font-bold text-xs uppercase tracking-tighter text-white leading-tight group-hover:text-[#FF6B00] transition-colors">
                {personalInfo.name}
              </div>
              <div className="text-[9px] font-mono text-zinc-400 tracking-widest uppercase">
                {personalInfo.title}
              </div>
            </div>
          </button>

          {/* Desktop Nav Items with Active Pill */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-3 py-1 text-[11px] font-mono uppercase tracking-widest transition-colors ${
                    isActive ? 'text-[#FF6B00] font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-[#FF6B00]/15 rounded-full border border-[#FF6B00]/40"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition"
              title="Open Command Palette (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span className="hidden md:inline text-[10px] uppercase tracking-wider">Cmd</span>
              <kbd className="px-1 py-0.5 text-[9px] bg-black/60 border border-zinc-700 rounded text-zinc-400">⌘K</kbd>
            </button>

            {/* Resume Button */}
            <button
              onClick={onOpenResumeModal}
              className="px-4 py-1.5 border border-white/20 rounded-full text-[10px] uppercase tracking-widest font-semibold text-white hover:bg-[#FF6B00] hover:border-[#FF6B00] hover:text-black transition-all duration-300 flex items-center gap-1.5"
            >
              <FileText className="w-3 h-3" />
              <span>Resume</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-[#FF6B00] transition active:scale-90"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-[#FF6B00]" /> : <Moon className="w-3.5 h-3.5 text-zinc-800" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-[7999] glass-panel rounded-2xl p-6 border border-[#FF6B00]/40 lg:hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          >
            <div className="flex flex-col gap-3 font-mono text-sm">
              <div className="text-xs text-[#FF6B00] tracking-widest uppercase mb-1">
                SECTIONS
              </div>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left py-2 px-3 rounded-xl transition ${
                    activeSection === item.id
                      ? 'bg-[#FF6B00] text-black font-bold'
                      : 'text-zinc-300 hover:bg-zinc-800/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="border-t border-[#2E2E2E] my-2 pt-3 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="flex items-center gap-2 py-2 px-3 bg-zinc-900 rounded-xl text-zinc-300 border border-zinc-800"
                >
                  <Search className="w-4 h-4 text-[#FF6B00]" />
                  <span>Search Commands (Ctrl + K)</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

