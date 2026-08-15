import React from 'react';
import { motion } from 'framer-motion';

interface AudioWaveformProps {
  isSpeaking: boolean;
  barCount?: number;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({ isSpeaking, barCount = 7 }) => {
  return (
    <div className="flex items-center gap-1 h-6">
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.span
          key={i}
          className="w-1 bg-brand-blue rounded-full shadow-[0_0_8px_#2563EB]"
          animate={
            isSpeaking
              ? {
                  height: [6, Math.floor(Math.random() * 16) + 10, 6],
                  backgroundColor: ['#3B82F6', '#2563EB', '#60A5FA'],
                }
              : { height: 4 }
          }
          transition={
            isSpeaking
              ? {
                  repeat: Infinity,
                  duration: 0.4 + (i % 3) * 0.1,
                  ease: 'easeInOut',
                  delay: i * 0.05,
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
};
