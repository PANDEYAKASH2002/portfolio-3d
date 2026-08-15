import { ExperienceItem } from '../types/portfolio';

export const experiences: ExperienceItem[] = [
  {
    id: 'cowberry',
    company: 'COWBERRY',
    role: 'React.js Developer',
    period: 'July 2024 – Present',
    location: 'Surat, Gujarat',
    isCurrent: true,
    highlights: [
      'Architected real-time employee location tracking & live GPS monitoring interfaces using Leaflet.js maps.',
      'Developed comprehensive workforce task assignment system, employee CRUD modules, and activity log feeds.',
      'Engineered Role-Based Access Control (RBAC) with granular permission trees and protected routes.',
      'Implemented i18n supporting 22 Indian languages and dynamic theme customization for client white-labeling.',
      'Optimized state management using Redux Toolkit & Context API, delivering fast and responsive UI interactions.',
      'Integrated backend REST APIs and implemented client-side data caching and pagination for high throughput.'
    ],
    technologies: [
      'React.js',
      'TypeScript',
      'Tailwind CSS',
      'Redux Toolkit',
      'Context API',
      'Leaflet.js',
      'REST APIs',
      'RBAC',
      'i18n',
      'Linux',
      'Contabo VPS'
    ]
  },
  {
    id: 'gvclouds',
    company: 'GVCLOUDS SECURE',
    role: 'Frontend Developer Intern',
    period: 'September 2024 – February 2025',
    location: 'Noida, UP',
    isCurrent: false,
    highlights: [
      'Built responsive web interfaces using modern HTML5, CSS3, and JavaScript ES6+ standards.',
      'Collaborated closely with UI/UX designers to translate wireframes into interactive component screens.',
      'Performed application debugging, cross-browser compatibility testing, and asset compression.',
      'Utilized Git & GitHub workflows for feature branching, code reviews, and version control.'
    ],
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'Responsive Web Design',
      'UI/UX Implementation',
      'Debugging',
      'Git',
      'GitHub'
    ]
  }
];
