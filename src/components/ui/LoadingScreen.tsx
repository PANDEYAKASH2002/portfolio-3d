import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_MESSAGES = [
  'Initializing Portfolio...',
  'Loading 3D Sketchfab Experience...',
  'Preparing Projects...',
  'Loading Experience...',
  'Welcome.',
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 35);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const msgInterval = Math.floor(100 / LOADING_MESSAGES.length);
    const idx = Math.min(
      Math.floor(progress / msgInterval),
      LOADING_MESSAGES.length - 1
    );
    setMessageIndex(idx);
  }, [progress]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[#050811] flex flex-col items-center justify-center p-6 select-none text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Ambient blue radial glow */}
          <div className="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow" />

          <div className="flex flex-col items-center max-w-md w-full text-center space-y-8">
            {/* Title / Logo */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-950/60 border border-blue-500/40 shadow-blue-glow mb-4">
                <span className="font-mono text-xs text-brand-secondary font-bold tracking-widest uppercase">
                  SOFTWARE DEVELOPER
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                AKASH <span className="text-brand-blue">PANDEY</span>
              </h1>
            </motion.div>

            {/* Dynamic Status Message */}
            <div className="h-8 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-sm font-medium text-slate-300 tracking-wide"
                >
                  {LOADING_MESSAGES[messageIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full space-y-3">
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-blue-900">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-secondary via-brand-blue to-indigo-600 rounded-full shadow-[0_0_15px_#2563EB]"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Counter percentage */}
              <div className="flex justify-between items-center text-xs font-mono text-slate-400 font-semibold px-1">
                <span>DARK SYSTEM INIT</span>
                <span className="text-brand-secondary">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
