import { PersonalInfo, StatItem } from '../types/portfolio';

export const personalInfo: PersonalInfo = {
  name: 'Akash Pandey',
  role: 'Software Developer',
  subroles: ['React.js Developer', 'Software Developer', 'Frontend Engineer'],
  tagline: 'Building scalable, responsive and immersive web experiences with modern frontend technologies.',
  bio: [
    'I am a passionate React.js Developer & Software Developer focused on engineering high-performance web platforms and interactive user interfaces.',
    'Specialized in building workforce management ecosystems, real-time GPS tracking applications, multi-tenant admin dashboards, marketplace platforms, and multilingual interfaces (supporting 22 Indian languages).',
    'Experienced with cloud deployments using Contabo VPS, Nginx, Linux server management, and GoDaddy DNS configuration.'
  ],
  location: 'Surat, Gujarat, India',
  email: 'pandeyaakash7491@gmail.com',
  github: 'https://github.com/PANDEYAKASH2002',
  linkedin: 'https://www.linkedin.com/flagship-web/in/akash-%F0%9F%8C%B1-pandey-6960842b1/',
  resumeUrl: '/resume/Akash_Pandey_Resume.pdf',
};

export const aboutStats: StatItem[] = [
  {
    id: 'exp',
    label: 'Years Experience',
    value: 1,
    suffix: '+',
  },
  {
    id: 'projects',
    label: 'Major Projects',
    value: 4,
    suffix: '+',
  },
  {
    id: 'languages',
    label: 'Languages Supported',
    value: 22,
    suffix: '+',
  },
  {
    id: 'panels',
    label: 'Application Panels',
    value: 3,
    suffix: '',
  },
];
