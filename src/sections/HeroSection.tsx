import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiArrowDown, HiDownload, HiMail } from 'react-icons/hi';

import { unlockAudio, playShortCircuitSound } from '../utils/shortCircuitSound';
import { HeroBackground3D } from '@/components/3d/HeroBackground3D';

// Add this useEffect to unlock audio on any user interaction
const HeroSection: React.FC = () => {
  // Unlock audio on first click/touch anywhere on the page
  useEffect(() => {
    const handleFirstInteraction = () => {
      unlockAudio();
      // Remove listeners after first unlock
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const handleNameHover = () => {
    // Play the sound effect on hover
    playShortCircuitSound();
  };

  const scrollToProjects = () => {
    // Your scroll logic
  };

  const scrollToContact = () => {
    // Your scroll logic
  };

  // Your socialLinks object
  const socialLinks = {
    resume: '/path-to-resume.pdf'
  };

  // Your state for glitching
  const [isGlitching, setIsGlitching] = React.useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden bg-hero-radial select-none"
    >
      <HeroBackground3D />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-blue-200 shadow-blue-glow"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-ping" />
          <span className="text-xs font-mono font-bold text-navy-800 tracking-wider uppercase">
            AVAILABLE FOR FULL-TIME ROLES & PROJECTS
          </span>
        </motion.div>

        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onMouseEnter={() => {
              handleNameHover();
              setIsGlitching(true);
            }}
            onMouseLeave={() => setIsGlitching(false)}
            className={`text-5xl sm:text-7xl md:text-8xl font-extrabold text-gradient-blue tracking-tight leading-none cursor-pointer transition-transform duration-100 ${
              isGlitching ? 'animate-glitch' : ''
            }`}
            style={
              isGlitching
                ? {
                    textShadow:
                      '2px 0 #60A5FA, -2px 0 #2563EB, 0 0 20px rgba(37,99,235,0.8)',
                  }
                : undefined
            }
          >
            AKASH <span className="text-gradient-blue">PANDEY</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 text-lg sm:text-2xl font-bold text-navy-800"
          >
            <span className="px-3 py-1 rounded-xl bg-blue-100/60 text-brand-blue border border-blue-200">
              Software Developer
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-white">React.js Developer</span>
            <span className="text-slate-300">•</span>
            <span className="text-brand-secondary">Frontend Engineer</span>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto text-base sm:text-xl text-navy-600 font-medium leading-relaxed"
        >
          Building scalable, responsive and immersive web experiences with modern frontend technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={scrollToProjects}
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-brand-blue text-white font-extrabold text-sm tracking-wider uppercase shadow-[0_10px_25px_rgba(37,99,235,0.4)] hover:shadow-blue-glow-lg hover:bg-brand-blue-hover transition-colors duration-200 group transform-gpu"
          >
            <span>EXPLORE MY WORK</span>
            <HiArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <a
            href={socialLinks.resume}
            download="Akash_Pandey_Resume.pdf"
            className="flex items-center gap-2 px-8 py-4 rounded-full glass-card border border-blue-300 text-white font-extrabold text-sm tracking-wider uppercase hover:border-brand-blue hover:text-brand-blue transition-colors duration-200 shadow-glass transform-gpu"
          >
            <HiDownload className="w-4 h-4 text-brand-blue " />
            <span>DOWNLOAD RESUME</span>
          </a>

          <button
            onClick={scrollToContact}
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-navy-900 text-white font-extrabold text-sm tracking-wider uppercase hover:bg-navy-800 transition-colors duration-200 shadow-lg transform-gpu"
          >
            <HiMail className="w-4 h-4 text-brand-secondary" />
            <span>CONTACT ME</span>
          </button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-navy-700 cursor-pointer pointer-events-auto"
        onClick={scrollToProjects}
      >
        <span className="text-[10px] font-mono font-semibold tracking-widest uppercase">
          SCROLL DOWN
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-blue-400 flex items-start justify-center p-1">
          <div className="w-1.5 h-2.5 rounded-full bg-brand-blue animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;