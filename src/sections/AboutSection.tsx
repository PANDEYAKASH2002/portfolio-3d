import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { InteractiveAvatar3D } from '../components/3d/InteractiveAvatar3D';
import { personalInfo, aboutStats } from '../data/personalData';
import { GlassCard } from '../components/ui/GlassCard';
import { HiSparkles, HiCode, HiServer } from 'react-icons/hi';

interface CounterProps {
  value: number;
  suffix: string;
  inView: boolean;
}

const AnimatedCounter: React.FC<CounterProps> = ({ value, suffix, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / value)) || 50;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 relative bg-[#050811] text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40"
          >
            <HiSparkles className="w-18 h-14 text-brand-secondary" />
          
          </motion.div> */}

           <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-underline "
          >
            ABOUT <span className="text-brand-blue">ME</span>
          </motion.h2>
        </div>

        {/* Main Grid: Left 3D Lion Sketchfab Frame, Right About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Sketchfab 3D Lion Model */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <InteractiveAvatar3D />
          </motion.div>

          {/* Right Column: Engaging Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Bio Introduction Card */}
            <GlassCard glow className="space-y-4">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-brand-secondary">Software Developer</span> & React Specialist
              </h3>
              {personalInfo.bio.map((paragraph, idx) => (
                <p key={idx} className="text-slate-300 leading-relaxed font-medium text-sm sm:text-base">
                  {paragraph}
                </p>
              ))}
            </GlassCard>

            {/* Core Capability Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <GlassCard className="space-y-2">
                <div className="p-2.5 rounded-xl bg-blue-900/60 text-brand-secondary w-fit border border-blue-500/30">
                  <HiCode className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">Frontend Architecture</h4>
                <p className="text-xs text-slate-400 font-medium">
                  React.js, TypeScript, Tailwind CSS, Redux Toolkit, Context API, React Query, Leaflet.js maps & i18n support.
                </p>
              </GlassCard>

              <GlassCard className="space-y-2">
                <div className="p-2.5 rounded-xl bg-blue-900/60 text-brand-secondary w-fit border border-blue-500/30">
                  <HiServer className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">Systems & Cloud</h4>
                <p className="text-xs text-slate-400 font-medium">
                  REST APIs integration, Contabo VPS deployment, Nginx reverse proxy, Linux server administration & GoDaddy DNS.
                </p>
              </GlassCard>
            </div>

            {/* Specialized Applications Pill Chips */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Specialized Application Ecosystems Built:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Workforce Management',
                  'Employee Real-time GPS Tracking',
                  'Marketplace / E-Commerce Ecosystems',
                  'Admin & Seller Panels',
                  'Customer Storefronts',
                  '22 Indian Languages (i18n)',
                  'Role-Based Access (RBAC)',
                ].map((chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1.5 rounded-xl bg-blue-950/80 text-brand-secondary text-xs font-bold border border-blue-500/40 shadow-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6"
        >
          {aboutStats.map((stat) => (
            <GlassCard
              key={stat.id}
              glow
              className="text-center space-y-1 hover:border-brand-blue transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-secondary font-mono tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wide">
                {stat.label}
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
