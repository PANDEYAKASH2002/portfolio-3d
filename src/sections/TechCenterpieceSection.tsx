import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TechGlobe3D } from '../components/3d/TechGlobe3D';
import { HiGlobeAlt } from 'react-icons/hi';

export const TechCenterpieceSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="py-24 px-6 relative bg-[#050811] text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/15 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40"
          >
            <HiGlobeAlt className="w-4 h-4 text-brand-secondary" />
            <span className="text-xs font-mono font-bold text-brand-secondary uppercase tracking-wider">
              DEVELOPMENT ECOSYSTEM
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            THE 3D <span className="text-brand-blue">TECH GLOBE</span>
          </motion.h2>

          <p className="text-sm font-medium text-slate-400 max-w-lg mx-auto">
            Orbiting core frameworks and developer utilities powering production applications for Akash Pandey.
          </p>
        </div>

        {/* 3D Tech Globe Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative glass-card rounded-3xl p-4 border border-blue-500/30 shadow-blue-glow overflow-hidden bg-navy-950/60"
        >
          <TechGlobe3D />
        </motion.div>
      </div>
    </section>
  );
};
