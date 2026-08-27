export type ThemeMode = 'dark' | 'light';

export interface Skill {
  id: string;
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Databases' | 'AI/ML' | 'Embedded & IoT' | 'Tools';
  proficiency: number; // 0 to 100
  iconName: string;
  description: string;
  featured?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: 'AI/ML' | 'Full Stack' | 'Embedded & IoT' | 'Featured' | 'Frontend';
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  metrics?: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  duration: string;
  period: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  details: string;
  highlights: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  image: string;
  skills: string[];
  verifyUrl: string;
}

export interface PersonalInfo {
  name: string;
  shortName: string;
  title: string;
  tagline: string;
  subheading: string;
  statusBadge: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  bio: string;
  careerObjective: string;
  interests: string[];
  typingRoles: string[];
  avatarUrl?: string;
}

export interface GithubStat {
  totalCommits: number;
  pullRequests: number;
  starsEarned: number;
  contributionsThisYear: number;
  currentStreak: number;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certificates: CertificateItem[];
  githubStats: GithubStat;
}


