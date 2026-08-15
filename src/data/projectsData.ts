import { ProjectItem } from '../types/portfolio';

export const projectsData: ProjectItem[] = [
  {
    id: 'harappa-biosciences',
    title: 'HARAPPA BIOSCIENCES',
    subtitle: 'Multi-panel marketplace & e-commerce ecosystem',
    description: 'A comprehensive multi-tenant marketplace platform engineered with three distinct application portals: Admin Panel, Seller Panel, and Customer Storefront with full inventory management.',
    highlights: [
      'Engineered 3 interconnected portals (Admin, Seller & Customer Storefront)',
      'Product catalog, inventory control & real-time order tracking workflow',
      'Advanced User Management & Analytics reporting dashboards',
      'Production deployment on Contabo VPS with Nginx reverse proxy configuration'
    ],
    technologies: ['React.js', 'Redux Toolkit', 'Context API', 'Tailwind CSS', 'REST APIs', 'Nginx', 'Contabo VPS', 'Linux'],
    category: 'E-Commerce Ecosystem',
    liveUrl: '#',
    githubUrl: 'https://github.com/PANDEYAKASH2002',
    featured: true,
    colorGradient: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'lantern360',
    title: 'LANTERN360',
    subtitle: 'Workforce Management & Live GPS Tracking Platform',
    description: 'An enterprise workforce management system featuring live GPS employee tracking on interactive Leaflet maps, multi-tier HR & Manager approval workflows, and performance monitoring.',
    highlights: [
      'Live GPS employee location tracking with custom interactive Leaflet maps',
      'Attendance management, task assignment & automated performance reports',
      'Multi-level authorization (HR Approval, Manager Approval, Employee Roles)',
      'Role-based UI rendering with protected route guards and access tokens'
    ],
    technologies: ['React.js', 'Redux', 'Context API', 'Leaflet.js', 'REST APIs', 'Tailwind CSS', 'Nginx', 'Contabo VPS', 'Linux'],
    category: 'Workforce Platform',
    liveUrl: '#',
    githubUrl: 'https://github.com/PANDEYAKASH2002',
    featured: true,
    colorGradient: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'weather-forecast',
    title: 'WEATHER FORECAST',
    subtitle: 'Real-Time Weather & Climate Intelligence App',
    description: 'A high-performance weather forecast web application featuring location search, hourly/weekly forecasts, interactive weather visual metrics, and automated location detection.',
    highlights: [
      'Real-time weather data fetching with fallback API caching strategy',
      '5-day detailed forecast metrics with temperature trend visualizers',
      'Geolocation detection & dynamic background thematic updates',
      'Fully responsive glassmorphism UI designed with Tailwind CSS'
    ],
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Framer Motion'],
    category: 'Weather App',
    liveUrl: '#',
    githubUrl: 'https://github.com/PANDEYAKASH2002',
    featured: false,
    colorGradient: 'from-sky-500 to-blue-600',
  },
  {
    id: 'smart-facility',
    title: 'SMART FACILITY MANAGEMENT',
    subtitle: 'Enterprise Facility Management & Operations Dashboard',
    description: 'A sleek operations management web application built for monitoring facility tasks, ticket resolution workflows, asset maintenance schedules, and administrative resource allocation.',
    highlights: [
      'Real-time facility operations status feed and maintenance ticketing',
      'Interactive metrics dashboard showing asset availability and work orders',
      'Modern frontend architecture with scalable component hierarchy',
      'Lightweight, high-performance interface with dark/light themes'
    ],
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Chart Utilities'],
    category: 'Facility Dashboard',
    liveUrl: '#',
    githubUrl: 'https://github.com/PANDEYAKASH2002',
    featured: false,
    colorGradient: 'from-blue-700 to-slate-800',
  },
];
