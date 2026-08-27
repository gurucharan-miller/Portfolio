import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { CustomCursor } from './components/ui/CustomCursor';
import { Preloader } from './components/ui/Preloader';
import { CommandPalette } from './components/ui/CommandPalette';
import { ResumeModal } from './components/ui/ResumeModal';
import { Navbar } from './components/ui/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Education } from './components/sections/Education';
import { Certificates } from './components/sections/Certificates';
import { GithubStats } from './components/sections/GithubStats';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/ui/Footer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

function MainApp() {
  const [loading, setLoading] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Sync routing on popstate / custom navigation
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Check auth state when navigating to /admin routes
  useEffect(() => {
    if (currentPath.startsWith('/admin')) {
      fetch('/api/auth/me')
        .then((res) => {
          if (res.ok) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
        });
    }
  }, [currentPath]);

  // Navigate helper
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Initialize Lenis Smooth Scroll for Public Site
  useEffect(() => {
    if (loading || currentPath.startsWith('/admin')) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loading, currentPath]);

  // Admin routing
  if (currentPath.startsWith('/admin')) {
    if (isAuthenticated === null) {
      return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#FF6B00] border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    if (isAuthenticated) {
      return (
        <AdminDashboard
          onLogout={() => {
            setIsAuthenticated(false);
            navigateTo('/admin/login');
          }}
          onGoHome={() => navigateTo('/')}
        />
      );
    }

    return (
      <AdminLogin
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          navigateTo('/admin/dashboard');
        }}
        onGoHome={() => navigateTo('/')}
      />
    );
  }

  // Public Portfolio Site
  return (
    <>
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <div className="relative min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#FF6B00] selection:text-black overflow-x-hidden">
          {/* Custom Awwwards Glowing Cursor */}
          <CustomCursor />

          {/* Floating Glass Navbar */}
          <Navbar
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            onOpenResumeModal={() => setResumeModalOpen(true)}
          />

          {/* Spotlight Command Palette (Ctrl + K) */}
          <CommandPalette
            isOpen={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
            onOpenResume={() => setResumeModalOpen(true)}
          />

          {/* Full-Screen Glass Resume Modal */}
          <ResumeModal
            isOpen={resumeModalOpen}
            onClose={() => setResumeModalOpen(false)}
          />

          {/* Page Main Sections */}
          <main>
            <Hero onOpenResumeModal={() => setResumeModalOpen(true)} />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Certificates />
            <GithubStats />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </PortfolioProvider>
  );
}

