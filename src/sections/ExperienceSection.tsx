import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experiences } from '../data/experienceData';
import { GlassCard } from '../components/ui/GlassCard';
import { HiBriefcase, HiCalendar, HiLocationMarker, HiCheckCircle } from 'react-icons/hi';

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="experience" ref={sectionRef} className="py-24 px-6 relative bg-[#080C17] text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40"
          >
            <HiBriefcase className="w-4 h-4 text-brand-secondary" />
            <span className="text-xs font-mono font-bold text-brand-secondary uppercase tracking-wider">
              CAREER JOURNEY
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            WORK <span className="text-brand-blue">EXPERIENCE</span>
          </motion.h2>
        </div>

        {/* Futuristic Vertical Timeline Container */}
        <div className="relative pt-4">
          {/* Glowing Vertical Center/Left Blue Line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-brand-secondary via-brand-blue to-indigo-600 rounded-full shadow-[0_0_15px_#2563EB]" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Glowing Node Icon */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full bg-navy-950 border-2 border-brand-blue flex items-center justify-center shadow-blue-glow">
                    <div className="w-3.5 h-3.5 rounded-full bg-brand-blue animate-pulse" />
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Experience Timeline Card */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0">
                    <GlassCard glow={exp.isCurrent} className="space-y-4 hover:border-brand-blue transition-all">
                      {/* Header info */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                        <div>
                          <span className="text-xs font-mono font-bold text-brand-secondary uppercase tracking-widest">
                            {exp.company}
                          </span>
                          <h3 className="text-xl font-extrabold text-white">{exp.role}</h3>
                        </div>

                        {exp.isCurrent && (
                          <span className="px-3 py-1 rounded-full bg-blue-900/80 text-brand-secondary font-mono font-bold text-xs border border-blue-500/40 shadow-sm">
                            PRESENT ROLE
                          </span>
                        )}
                      </div>

                      {/* Location & Period metadata */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
                        <div className="flex items-center gap-1">
                          <HiCalendar className="w-4 h-4 text-brand-secondary" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <HiLocationMarker className="w-4 h-4 text-brand-secondary" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Highlights checklist */}
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-medium">
                        {exp.highlights.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <HiCheckCircle className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technologies Tag Chips */}
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-blue-950/80 text-brand-secondary text-[11px] font-mono font-bold border border-blue-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
