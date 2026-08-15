import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TechCubes3D } from '../components/3d/TechCubes3D';
import { skillsList } from '../data/skillsData';
import { GlassCard } from '../components/ui/GlassCard';
import { HiLightningBolt, HiCube } from 'react-icons/hi';

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-6 relative bg-[#050811] text-white overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40"
          >
            <HiCube className="w-4 h-4 text-brand-secondary" />
            <span className="text-xs font-mono font-bold text-brand-secondary uppercase tracking-wider">
              INTERACTIVE 3D SKILLS MATRIX
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            TECHNICAL <span className="text-brand-blue">STACK</span>
          </motion.h2>

          <p className="text-sm font-medium text-slate-400 max-w-xl mx-auto">
            Hover over the floating 3D tech cubes to extrude and inspect specialized frontend, state management, mapping, and DevOps tools.
          </p>
        </div>

        {/* 3D Tech Environment Canvas Container (Desktop & Tablet) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:block relative glass-card p-2 rounded-3xl border border-blue-500/30 shadow-blue-glow overflow-hidden bg-navy-950/60"
        >
          <TechCubes3D />
        </motion.div>

        {/* Responsive Grid for Mobile devices */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {skillsList.map((skill) => (
            <GlassCard key={skill.name} glow className="p-4 flex flex-col items-center text-center space-y-2">
              <div className="p-2 rounded-xl bg-blue-900/60 text-brand-secondary border border-blue-500/30">
                <HiLightningBolt className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm">{skill.name}</h4>
              {skill.description && (
                <p className="text-[11px] text-brand-blue font-medium">{skill.description}</p>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
