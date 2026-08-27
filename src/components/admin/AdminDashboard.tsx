import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  User,
  Sparkles,
  Layers,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Mail,
  KeyRound,
  LogOut,
  ExternalLink,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  Sliders,
  Tag
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  PortfolioData,
  Skill,
  Project,
  ExperienceItem,
  EducationItem
} from '../../types/portfolio';

interface AdminDashboardProps {
  onLogout: () => void;
  onGoHome: () => void;
}

type TabType = 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'education' | 'contact';

const SKILL_CATEGORIES = ['Languages', 'Frontend', 'Backend', 'Databases', 'AI/ML', 'Embedded & IoT', 'Tools'] as const;
const PROJECT_CATEGORIES = ['Embedded & IoT', 'Full Stack', 'AI/ML', 'Frontend', 'Featured'] as const;

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onGoHome }) => {
  const { data: initialData, saveData, resetToDefault, isSaving } = usePortfolio();

  // Local working copy of portfolio data
  const [formData, setFormData] = useState<PortfolioData>(JSON.parse(JSON.stringify(initialData)));
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Change Password Modal state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Skill filter in skills tab
  const [skillCategoryFilter, setSkillCategoryFilter] = useState<string>('All');

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleSave = async () => {
    const result = await saveData(formData);
    if (result.success) {
      showToast('success', 'Changes saved successfully and live on portfolio!');
    } else {
      showToast('error', result.error || 'Failed to save changes');
    }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all portfolio content to default? Any custom edits will be replaced.')) {
      const result = await resetToDefault();
      if (result.success) {
        showToast('success', 'Portfolio data reset to default successfully.');
        setFormData(JSON.parse(JSON.stringify(initialData)));
      } else {
        showToast('error', result.error || 'Failed to reset portfolio data');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {}
    onLogout();
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const json = await res.json();
      if (!res.ok) {
        setPasswordError(json.error || 'Failed to change password');
      } else {
        setPasswordSuccess('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          setIsPasswordModalOpen(false);
          setPasswordSuccess(null);
        }, 1800);
      }
    } catch (err: any) {
      setPasswordError(err?.message || 'Network error');
    } finally {
      setIsChangingPassword(false);
    }
  };

  // ================= Helpers for array state edits =================
  const updatePersonalInfo = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  // Skills CRUD
  const addSkill = () => {
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: 'New Skill',
      category: 'Frontend',
      proficiency: 85,
      iconName: 'Code2',
      description: 'Skill description',
      featured: false
    };
    setFormData((prev) => ({
      ...prev,
      skills: [newSkill, ...prev.skills]
    }));
  };

  const updateSkill = (index: number, updated: Partial<Skill>) => {
    setFormData((prev) => {
      const next = [...prev.skills];
      next[index] = { ...next[index], ...updated };
      return { ...prev, skills: next };
    });
  };

  const deleteSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  // Projects CRUD
  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: 'New Project Title',
      category: 'Full Stack',
      description: 'Brief one-sentence summary of the project.',
      longDescription: 'Comprehensive overview of features, architecture, and technology stack.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      techStack: ['React', 'TypeScript', 'Node.js'],
      githubUrl: 'https://github.com/gurucharan-miller',
      liveUrl: '',
      featured: true,
      metrics: 'Featured Project',
      highlights: ['Key engineering achievement or performance milestone']
    };
    setFormData((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));
  };

  const updateProject = (index: number, updated: Partial<Project>) => {
    setFormData((prev) => {
      const next = [...prev.projects];
      next[index] = { ...next[index], ...updated };
      return { ...prev, projects: next };
    });
  };

  const deleteProject = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const moveProject = (index: number, direction: 'up' | 'down') => {
    setFormData((prev) => {
      const next = [...prev.projects];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return { ...prev, projects: next };
    });
  };

  // Experience CRUD
  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      title: 'Role / Position Title',
      company: 'Organization or Project Team',
      location: 'Location, India',
      type: 'Project / Role',
      duration: 'Duration',
      period: '2024 — Present',
      description: 'Overview of work and scope.',
      responsibilities: ['Key responsibility or task delivered'],
      technologies: ['React', 'TypeScript'],
      achievements: ['Key measurable outcome or milestone']
    };
    setFormData((prev) => ({
      ...prev,
      experience: [newExp, ...prev.experience]
    }));
  };

  const updateExperience = (index: number, updated: Partial<ExperienceItem>) => {
    setFormData((prev) => {
      const next = [...prev.experience];
      next[index] = { ...next[index], ...updated };
      return { ...prev, experience: next };
    });
  };

  const deleteExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    setFormData((prev) => {
      const next = [...prev.experience];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return { ...prev, experience: next };
    });
  };

  // Education CRUD
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: 'B.E. Computer Science and Engineering (CSE)',
      institution: 'Institution Name',
      location: 'Location',
      period: 'Class of 2028',
      score: 'Honours Paper Eligible',
      details: 'Curriculum overview and engineering focus.',
      highlights: ['Key academic highlight or extracurricular role']
    };
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (index: number, updated: Partial<EducationItem>) => {
    setFormData((prev) => {
      const next = [...prev.education];
      next[index] = { ...next[index], ...updated };
      return { ...prev, education: next };
    });
  };

  const deleteEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-zinc-200 selection:bg-[#FF6B00] selection:text-black">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl border flex items-center gap-2.5 shadow-2xl ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
                : 'bg-red-950/90 border-red-500/40 text-red-200'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#121212]/95 backdrop-blur border-b border-zinc-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#1F1F1F] border border-[#FF6B00]/40 flex items-center justify-center font-heading font-extrabold text-sm text-[#FF6B00]">
            GC
          </div>
          <div>
            <div className="font-heading font-bold text-sm text-white flex items-center gap-2">
              PORTFOLIO ADMIN DASHBOARD
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00]">
                AUTHENTICATED
              </span>
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">
              Live Content Manager & Editor
            </div>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onGoHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-xs font-mono transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span className="hidden sm:inline">View Live Site</span>
          </button>

          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-xs font-mono transition-colors"
          >
            <KeyRound className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Change Password</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#FF6B00] hover:bg-[#FF8533] text-black font-semibold text-xs shadow-md shadow-[#FF6B00]/10 transition-all disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save All Changes</span>
          </button>

          <button
            onClick={handleLogout}
            title="Logout"
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-red-500/40 text-zinc-400 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 shrink-0 space-y-1.5">
          <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest px-3 mb-2">
            SECTIONS
          </div>
          {[
            { id: 'hero', label: 'Hero & Taglines', icon: Sparkles },
            { id: 'about', label: 'About & Bio', icon: User },
            { id: 'skills', label: 'Skills Matrix', icon: Layers },
            { id: 'projects', label: 'Projects Showcase', icon: FolderGit2 },
            { id: 'experience', label: 'Experience & Builds', icon: Briefcase },
            { id: 'education', label: 'Education & Honors', icon: GraduationCap },
            { id: 'contact', label: 'Contact & Socials', icon: Mail }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#FF6B00] text-black font-semibold shadow-md shadow-[#FF6B00]/10'
                    : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#FF6B00]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}

          <div className="pt-6 mt-6 border-t border-zinc-800">
            <button
              onClick={handleReset}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-red-400 hover:bg-red-950/20 border border-transparent hover:border-red-500/20 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-zinc-500" />
              <span>Reset to Factory Defaults</span>
            </button>
          </div>
        </aside>

        {/* Tab Content Panel */}
        <main className="flex-1 min-w-0 bg-[#141414] border border-zinc-800 rounded-2xl p-6 sm:p-8">
          {/* ================= HERO TAB ================= */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-bold text-lg text-white">Hero & Header Information</h2>
                  <p className="text-xs text-zinc-400">Controls your prominent display name, dynamic title, tagline, and availability badge.</p>
                </div>
                <button
                  onClick={handleSave}
                  className="px-3.5 py-1.5 rounded-lg bg-[#FF6B00] text-black text-xs font-semibold hover:bg-[#FF8533]"
                >
                  Save Section
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">Full Display Name</label>
                  <input
                    type="text"
                    value={formData.personalInfo.name}
                    onChange={(e) => updatePersonalInfo('name', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-zinc-700/60 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">Primary Title (Under Name)</label>
                  <input
                    type="text"
                    value={formData.personalInfo.title}
                    onChange={(e) => updatePersonalInfo('title', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-zinc-700/60 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Tagline (Typewriter Animation)</label>
                <input
                  type="text"
                  value={formData.personalInfo.tagline}
                  onChange={(e) => updatePersonalInfo('tagline', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-zinc-700/60 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Subheading Description</label>
                <textarea
                  rows={3}
                  value={formData.personalInfo.subheading}
                  onChange={(e) => updatePersonalInfo('subheading', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-zinc-700/60 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Status Badge Text</label>
                <input
                  type="text"
                  value={formData.personalInfo.statusBadge}
                  onChange={(e) => updatePersonalInfo('statusBadge', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-zinc-700/60 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Rotating Typing Roles (comma-separated)</label>
                <input
                  type="text"
                  value={formData.personalInfo.typingRoles?.join(', ') || ''}
                  onChange={(e) =>
                    updatePersonalInfo(
                      'typingRoles',
                      e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    )
                  }
                  className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-zinc-700/60 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>
          )}

          {/* ================= ABOUT TAB ================= */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-bold text-lg text-white">About Section & Profile Avatar</h2>
                  <p className="text-xs text-zinc-400">Edit the profile picture, biographical narrative, career objectives, and technical interests.</p>
                </div>
                <button
                  onClick={handleSave}
                  className="px-3.5 py-1.5 rounded-lg bg-[#FF6B00] text-black text-xs font-semibold hover:bg-[#FF8533]"
                >
                  Save Section
                </button>
              </div>

              {/* Profile Avatar Editor */}
              <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-zinc-700/60">
                <label className="block text-xs font-mono text-zinc-300 font-semibold mb-3 uppercase tracking-wider">
                  Profile Picture / Cyber Avatar
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Current Avatar Preview */}
                  <div className="w-28 h-32 rounded-2xl p-1 bg-gradient-to-tr from-[#FF6B00] to-amber-500 shadow-md shrink-0 relative overflow-hidden">
                    <div className="w-full h-full rounded-[12px] bg-black overflow-hidden flex items-center justify-center">
                      {formData.personalInfo.avatarUrl ? (
                        <img
                          src={formData.personalInfo.avatarUrl}
                          alt="Avatar Preview"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <span className="font-heading font-bold text-xl text-[#FF6B00]">GC</span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 w-full space-y-3">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">Image URL / Path</label>
                      <input
                        type="text"
                        value={formData.personalInfo.avatarUrl || ''}
                        onChange={(e) => updatePersonalInfo('avatarUrl', e.target.value)}
                        placeholder="/avatar.svg or https://..."
                        className="w-full px-3.5 py-2 bg-[#141414] border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">Or Upload Image File from Local Computer</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                updatePersonalInfo('avatarUrl', event.target.result as string);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="block w-full text-xs text-zinc-400 file:mr-4 file:py-1.5 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#FF6B00] file:text-black hover:file:bg-[#FF8533] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Biographical Narrative (About Text)</label>
                <textarea
                  rows={7}
                  value={formData.personalInfo.bio}
                  onChange={(e) => updatePersonalInfo('bio', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-zinc-700/60 rounded-xl text-sm text-white leading-relaxed focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Career Objective</label>
                <textarea
                  rows={3}
                  value={formData.personalInfo.careerObjective}
                  onChange={(e) => updatePersonalInfo('careerObjective', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-zinc-700/60 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Interests & Domains (comma-separated)</label>
                <input
                  type="text"
                  value={formData.personalInfo.interests?.join(', ') || ''}
                  onChange={(e) =>
                    updatePersonalInfo(
                      'interests',
                      e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    )
                  }
                  className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-zinc-700/60 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>
          )}

          {/* ================= SKILLS TAB ================= */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-heading font-bold text-lg text-white">Skills Matrix ({formData.skills.length})</h2>
                  <p className="text-xs text-zinc-400">Add, edit, or adjust proficiency levels and categories.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={addSkill}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>Add Skill</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-3.5 py-1.5 rounded-lg bg-[#FF6B00] text-black text-xs font-semibold hover:bg-[#FF8533]"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Category Filter Chips */}
              <div className="flex flex-wrap gap-1.5 pb-2">
                {['All', ...SKILL_CATEGORIES].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSkillCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                      skillCategoryFilter === cat
                        ? 'bg-[#FF6B00] text-black font-semibold'
                        : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {formData.skills
                  .map((skill, index) => ({ skill, originalIndex: index }))
                  .filter(({ skill }) => skillCategoryFilter === 'All' || skill.category === skillCategoryFilter)
                  .map(({ skill, originalIndex }) => (
                    <div
                      key={skill.id}
                      className="p-4 rounded-xl bg-[#191919] border border-zinc-800 hover:border-zinc-700 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => updateSkill(originalIndex, { name: e.target.value })}
                            placeholder="Skill Name"
                            className="px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-white font-medium focus:border-[#FF6B00]"
                          />
                          <select
                            value={skill.category}
                            onChange={(e) => updateSkill(originalIndex, { category: e.target.value as any })}
                            className="px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-zinc-300 focus:border-[#FF6B00]"
                          >
                            {SKILL_CATEGORIES.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-zinc-400">{skill.proficiency}%</span>
                            <input
                              type="range"
                              min="50"
                              max="100"
                              value={skill.proficiency}
                              onChange={(e) => updateSkill(originalIndex, { proficiency: Number(e.target.value) })}
                              className="flex-1 accent-[#FF6B00]"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 justify-end">
                          <label className="flex items-center gap-1.5 text-xs text-zinc-400 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={skill.featured || false}
                              onChange={(e) => updateSkill(originalIndex, { featured: e.target.checked })}
                              className="accent-[#FF6B00] rounded"
                            />
                            <span>Featured</span>
                          </label>
                          <button
                            onClick={() => deleteSkill(originalIndex)}
                            className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-950/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={skill.description || ''}
                        onChange={(e) => updateSkill(originalIndex, { description: e.target.value })}
                        placeholder="Short skill details / key technologies"
                        className="w-full px-3 py-1.5 bg-[#222222] border border-zinc-700/60 rounded-lg text-xs text-zinc-300 focus:border-[#FF6B00]"
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ================= PROJECTS TAB ================= */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-heading font-bold text-lg text-white">Projects Showcase ({formData.projects.length})</h2>
                  <p className="text-xs text-zinc-400">Add, edit, reorder, and link repositories or live demo URLs.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={addProject}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>Add Project</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-3.5 py-1.5 rounded-lg bg-[#FF6B00] text-black text-xs font-semibold hover:bg-[#FF8533]"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {formData.projects.map((project, index) => (
                  <div
                    key={project.id || index}
                    className="p-5 rounded-2xl bg-[#191919] border border-zinc-800 hover:border-zinc-700 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#FF6B00] font-bold">#{index + 1}</span>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => updateProject(index, { title: e.target.value })}
                          placeholder="Project Title"
                          className="px-3 py-1 bg-[#222222] border border-zinc-700 rounded-lg text-sm text-white font-semibold focus:border-[#FF6B00]"
                        />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => moveProject(index, 'up')}
                          disabled={index === 0}
                          title="Move Up"
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 disabled:opacity-30"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveProject(index, 'down')}
                          disabled={index === formData.projects.length - 1}
                          title="Move Down"
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 disabled:opacity-30"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProject(index)}
                          title="Delete Project"
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-950/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Category</label>
                        <select
                          value={project.category}
                          onChange={(e) => updateProject(index, { category: e.target.value as any })}
                          className="w-full px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-white"
                        >
                          {PROJECT_CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Metrics / Badge</label>
                        <input
                          type="text"
                          value={project.metrics || ''}
                          onChange={(e) => updateProject(index, { metrics: e.target.value })}
                          placeholder="e.g. AICTE IDEALab"
                          className="w-full px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>

                      <div className="flex items-center pt-5">
                        <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={project.featured}
                            onChange={(e) => updateProject(index, { featured: e.target.checked })}
                            className="accent-[#FF6B00] rounded"
                          />
                          <span>Show on Featured Tab</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">Short Card Description</label>
                      <textarea
                        rows={2}
                        value={project.description}
                        onChange={(e) => updateProject(index, { description: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-white focus:border-[#FF6B00]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">Detailed Modal Overview</label>
                      <textarea
                        rows={3}
                        value={project.longDescription}
                        onChange={(e) => updateProject(index, { longDescription: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-white focus:border-[#FF6B00]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Tech Stack (comma-separated)</label>
                        <input
                          type="text"
                          value={project.techStack?.join(', ') || ''}
                          onChange={(e) =>
                            updateProject(
                              index,
                              { techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) }
                            )
                          }
                          className="w-full px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">GitHub Repo URL</label>
                        <input
                          type="text"
                          value={project.githubUrl || ''}
                          onChange={(e) => updateProject(index, { githubUrl: e.target.value })}
                          placeholder="https://github.com/..."
                          className="w-full px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Live URL (optional)</label>
                        <input
                          type="text"
                          value={project.liveUrl || ''}
                          onChange={(e) => updateProject(index, { liveUrl: e.target.value })}
                          placeholder="https://..."
                          className="w-full px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= EXPERIENCE TAB ================= */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-heading font-bold text-lg text-white">Experience & Project Involvements ({formData.experience.length})</h2>
                  <p className="text-xs text-zinc-400">Edit hackathons, campus projects, research roles, and technical builds.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={addExperience}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>Add Item</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-3.5 py-1.5 rounded-lg bg-[#FF6B00] text-black text-xs font-semibold hover:bg-[#FF8533]"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {formData.experience.map((exp, index) => (
                  <div
                    key={exp.id || index}
                    className="p-5 rounded-2xl bg-[#191919] border border-zinc-800 hover:border-zinc-700 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#FF6B00] font-bold">#{index + 1}</span>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => updateExperience(index, { title: e.target.value })}
                          placeholder="Role / Title"
                          className="px-3 py-1 bg-[#222222] border border-zinc-700 rounded-lg text-sm text-white font-semibold focus:border-[#FF6B00]"
                        />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => moveExperience(index, 'up')}
                          disabled={index === 0}
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 disabled:opacity-30"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveExperience(index, 'down')}
                          disabled={index === formData.experience.length - 1}
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 disabled:opacity-30"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteExperience(index)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-950/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Company / Organization</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(index, { company: e.target.value })}
                          className="w-full px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Period / Badge</label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => updateExperience(index, { period: e.target.value })}
                          className="w-full px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Location</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateExperience(index, { location: e.target.value })}
                          className="w-full px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={exp.description}
                        onChange={(e) => updateExperience(index, { description: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-white focus:border-[#FF6B00]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">Responsibilities (One bullet point per line)</label>
                      <textarea
                        rows={3}
                        value={exp.responsibilities?.join('\n') || ''}
                        onChange={(e) =>
                          updateExperience(index, {
                            responsibilities: e.target.value.split('\n').filter(Boolean)
                          })
                        }
                        className="w-full px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">Technologies Used (comma-separated)</label>
                      <input
                        type="text"
                        value={exp.technologies?.join(', ') || ''}
                        onChange={(e) =>
                          updateExperience(index, {
                            technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                          })
                        }
                        className="w-full px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= EDUCATION TAB ================= */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-heading font-bold text-lg text-white">Education & Academics ({formData.education.length})</h2>
                  <p className="text-xs text-zinc-400">Edit degree programs, university regulations, honours eligibility, and achievements.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={addEducation}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>Add Degree</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-3.5 py-1.5 rounded-lg bg-[#FF6B00] text-black text-xs font-semibold hover:bg-[#FF8533]"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {formData.education.map((edu, index) => (
                  <div
                    key={edu.id || index}
                    className="p-5 rounded-2xl bg-[#191919] border border-zinc-800 hover:border-zinc-700 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, { degree: e.target.value })}
                        placeholder="Degree Title"
                        className="px-3 py-1 bg-[#222222] border border-zinc-700 rounded-lg text-sm text-white font-semibold focus:border-[#FF6B00] flex-1 max-w-md"
                      />
                      <button
                        onClick={() => deleteEducation(index)}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-950/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Institution</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducation(index, { institution: e.target.value })}
                          className="w-full px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Batch / Class</label>
                        <input
                          type="text"
                          value={edu.period}
                          onChange={(e) => updateEducation(index, { period: e.target.value })}
                          className="w-full px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Score / Status</label>
                        <input
                          type="text"
                          value={edu.score}
                          onChange={(e) => updateEducation(index, { score: e.target.value })}
                          className="w-full px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">Academic Overview</label>
                      <textarea
                        rows={2}
                        value={edu.details}
                        onChange={(e) => updateEducation(index, { details: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-white focus:border-[#FF6B00]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">Highlights (One per line)</label>
                      <textarea
                        rows={3}
                        value={edu.highlights?.join('\n') || ''}
                        onChange={(e) =>
                          updateEducation(index, {
                            highlights: e.target.value.split('\n').filter(Boolean)
                          })
                        }
                        className="w-full px-3 py-1.5 bg-[#222222] border border-zinc-700 rounded-lg text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= CONTACT TAB ================= */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-bold text-lg text-white">Contact & Social Channels</h2>
                  <p className="text-xs text-zinc-400">Update your public contact info, email addresses, and social profiles.</p>
                </div>
                <button
                  onClick={handleSave}
                  className="px-3.5 py-1.5 rounded-lg bg-[#FF6B00] text-black text-xs font-semibold hover:bg-[#FF8533]"
                >
                  Save Section
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-zinc-700/60 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">Phone (Optional)</label>
                  <input
                    type="text"
                    value={formData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-zinc-700/60 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Location / City</label>
                <input
                  type="text"
                  value={formData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-zinc-700/60 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">GitHub Profile URL</label>
                <input
                  type="text"
                  value={formData.personalInfo.github}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-zinc-700/60 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">LinkedIn Profile URL</label>
                <input
                  type="text"
                  value={formData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#1C1C1C] border border-zinc-700/60 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ================= CHANGE PASSWORD MODAL ================= */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#161616] border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-[#FF6B00]" />
                  <h3 className="font-heading font-bold text-white text-base">Change Admin Password</h3>
                </div>
                <button
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="text-zinc-500 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>

              {passwordError && (
                <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-red-300 text-xs">
                  {passwordError}
                </div>
              )}

              {passwordSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs">
                  {passwordSuccess}
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    placeholder="Enter current password"
                    className="w-full px-3.5 py-2 bg-[#202020] border border-zinc-700 rounded-xl text-sm text-white focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">New Password (min 8 chars)</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="Enter new strong password"
                    className="w-full px-3.5 py-2 bg-[#202020] border border-zinc-700 rounded-xl text-sm text-white focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Re-enter new password"
                    className="w-full px-3.5 py-2 bg-[#202020] border border-zinc-700 rounded-xl text-sm text-white focus:border-[#FF6B00]"
                  />
                </div>

                <div className="pt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="flex-1 py-2 rounded-xl bg-zinc-800 text-zinc-400 text-xs font-semibold hover:bg-zinc-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="flex-1 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#FF8533] text-black text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    {isChangingPassword ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Update Password'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
