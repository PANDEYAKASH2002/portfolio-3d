import { SkillItem } from '../types/portfolio';

export const skillsList: SkillItem[] = [
  { name: 'React.js', category: 'frontend', iconName: 'SiReact', description: 'Component architecture, Hooks, Custom hooks' },
  { name: 'TypeScript', category: 'frontend', iconName: 'SiTypescript', description: 'Type safety, Interfaces, Generics' },
  { name: 'JavaScript', category: 'frontend', iconName: 'SiJavascript', description: 'ES6+, Async/Await, Closures, DOM' },
  { name: 'Tailwind CSS', category: 'frontend', iconName: 'SiTailwindcss', description: 'Utility-first CSS, Responsive, Glassmorphism' },
  { name: 'Redux Toolkit', category: 'state', iconName: 'SiRedux', description: 'Global state, Slices, RTK Query' },
  { name: 'Context API', category: 'state', iconName: 'FaBoxes', description: 'Prop-drilling avoidance, Theme & Auth state' },
  { name: 'React Query', category: 'api', iconName: 'SiReactquery', description: 'Server state management, Caching, Mutating' },
  { name: 'Three.js', category: '3d', iconName: 'SiThreedotjs', description: '3D Graphics, WebGL, Lighting, Shaders' },
  { name: 'Framer Motion', category: 'frontend', iconName: 'SiFramer', description: 'Page transitions, Layout animations, Gestures' },
  { name: 'Leaflet.js', category: 'frontend', iconName: 'SiLeaflet', description: 'GPS tracking, Custom markers, Live map views' },
  { name: 'REST APIs', category: 'api', iconName: 'FaServer', description: 'Fetch, Axios, Endpoints integration, Error handling' },
  { name: 'Git', category: 'tools', iconName: 'SiGit', description: 'Version control, Branching, Merging' },
  { name: 'GitHub', category: 'tools', iconName: 'SiGithub', description: 'Repositories, Pull requests, Collaboration' },
  { name: 'Linux', category: 'devops', iconName: 'SiLinux', description: 'Bash commands, Server setup, File permissions' },
  { name: 'Nginx', category: 'devops', iconName: 'SiNginx', description: 'Reverse proxy, SSL, Static file serving' },
  { name: 'Contabo VPS', category: 'devops', iconName: 'FaCloud', description: 'Cloud hosting setup, Deployment, DNS config' },
];
