import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioWaveform } from './AudioWaveform';
import { HiVolumeUp } from 'react-icons/hi';

interface SpeakingIndicatorProps {
  isSpeaking: boolean;
  text: string;
}

export const SpeakingIndicator: React.FC<SpeakingIndicatorProps> = ({ isSpeaking, text }) => {
  return (
    <AnimatePresence>
      {isSpeaking && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="absolute -top-20 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-sm glass-card p-3 rounded-2xl border border-blue-300/80 shadow-blue-glow flex items-center gap-3 backdrop-blur-xl"
        >
          <div className="p-2 rounded-xl bg-blue-100/80 text-brand-blue flex-shrink-0 animate-pulse">
            <HiVolumeUp className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold tracking-wider text-brand-blue uppercase">
                AI Voice Synthesis Active
              </span>
              <AudioWaveform isSpeaking={true} barCount={5} />
            </div>
            <p className="text-xs font-semibold text-navy-900 leading-tight truncate">
              "{text}"
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
