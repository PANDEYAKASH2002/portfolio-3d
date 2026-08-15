import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import { GlassCard } from '../components/ui/GlassCard';
import { HiExternalLink, HiSparkles, HiCheckCircle, HiViewGrid } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGridMode, setIsGridMode] = useState(true); // Default to grid mode
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  // Track scroll progress inside container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative min-h-screen bg-slate-50/70 py-20 px-6 overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-brand-light/30 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[180px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200">
            <HiSparkles className="w-4 h-4 text-brand-blue" />
            <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-wider">
              PROJECT GRID
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
            FEATURED <span className="text-brand-blue">PROJECTS</span>
          </h2>

          <p className="text-sm font-medium text-navy-600 max-w-lg mx-auto">
            Hover over any project card to flip and see more details
          </p>
        </div>

        {/* Grid Layout - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projectsData.map((project, index) => (
            <ProjectCardItem
              key={project.id}
              project={project}
              index={index}
              isFlipped={flippedCardId === project.id}
              onFlip={() => setFlippedCardId(flippedCardId === project.id ? null : project.id)}
              onHover={(hover) => setFlippedCardId(hover ? project.id : null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardItemProps {
  project: typeof projectsData[0];
  index: number;
  isFlipped: boolean;
  onFlip: () => void;
  onHover: (hover: boolean) => void;
}

const ProjectCardItem: React.FC<ProjectCardItemProps> = ({
  project,
  index,
  isFlipped,
  onFlip,
  onHover,
}) => {
  return (
    <div 
      className="relative h-[520px] perspective-[1000px]"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <motion.div
        className="relative w-full h-full transition-transform duration-700 transform-style-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of Card */}
        <div 
          className="absolute w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <GlassCard
            glow={isFlipped}
            className="h-full flex flex-col hover:shadow-blue-glow transition-all duration-300"
          >
            {/* Top Header & Tag */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-blue-100/70 text-brand-blue font-mono font-bold text-xs border border-blue-200">
                {project.category}
              </span>
              <span className="text-xs font-mono font-semibold text-slate-700">
                0{index + 1}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-extrabold text-navy-900 tracking-tight group-hover:text-brand-blue transition-colors">
              {project.title}
            </h3>
            <p className="text-xs font-bold text-brand-secondary mb-3">{project.subtitle}</p>

            {/* Description */}
            <p className="text-black-700  text-bold text-xs sm:text-sm font-medium mb-4 line-clamp-3 flex-grow">
              {project.description}
            </p>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md bg-blue-50 text-brand-blue font-mono text-[11px] font-bold border border-blue-200"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-brand-blue font-mono text-[11px] font-bold border border-blue-200">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            {/* Hover indicator - flip hint */}
            <div className="mt-auto text-center text-xs text-slate-400 font-medium">
              Hover to flip
            </div>
          </GlassCard>
        </div>

        {/* Back of Card */}
        <div 
          className="absolute w-full h-full backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <GlassCard
            glow={isFlipped}
            className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50"
          >
            <div className="flex flex-col h-full p-6">
              <h3 className="text-xl font-extrabold text-navy-900 mb-3">
                {project.title}
              </h3>
              
              {/* Key Highlights Checklist */}
              <div className="flex-1 space-y-2 mb-4">
                <p className="text-xs font-semibold text-brand-blue uppercase tracking-wider mb-2">
                  Key Features
                </p>
                {project.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <HiCheckCircle className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-black font-medium">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 mt-auto">
                <a
                  href={project.liveUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-xs shadow-blue-glow hover:bg-brand-blue-hover transition-colors"
                >
                  <span>LIVE DEMO</span>
                  <HiExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={project.githubUrl || 'https://github.com/PANDEYAKASH2002'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl glass-card border border-blue-200 text-brand-blue font-bold text-xs hover:border-brand-blue hover:text-brand-blue transition-colors"
                >
                  <SiGithub className="w-4 h-4" />
                  <span>VIEW CODE</span>
                </a>
              </div>
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  );
};