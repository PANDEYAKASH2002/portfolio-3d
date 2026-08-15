export interface PersonalInfo {
  name: string;
  role: string;
  subroles: string[];
  tagline: string;
  bio: string[];
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  technologies: string[];
  isCurrent?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface SkillItem {
  name: string;
  category: 'frontend' | 'state' | '3d' | 'api' | 'tools' | 'devops';
  iconName?: string;
  description?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  technologies: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  colorGradient: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
