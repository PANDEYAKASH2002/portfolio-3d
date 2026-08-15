import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { speakRobotGreeting } from '../../utils/robotSound';
import { AudioWaveform } from '../ui/AudioWaveform';
import { HiSparkles, HiVolumeUp } from 'react-icons/hi';

const GREETING = "Hello visitor, myself AKASH PANDEY, I am a SOFTWARE DEVELOPER";

export const InteractiveAvatar3D: React.FC = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState({ rx: 0, ry: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const mouthIntervalRef = useRef<number | null>(null);

  // Robot "looks" at the pointer anywhere on screen, not just inside the card
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const maxPupil = 6;
      const dist = Math.min(Math.hypot(dx, dy), 300);
      const angle = Math.atan2(dy, dx);
      setEyeOffset({
        x: Math.cos(angle) * (maxPupil * (dist / 300)),
        y: Math.sin(angle) * (maxPupil * (dist / 300)),
      });

      const maxTilt = 8;
      const clampedX = Math.max(-1, Math.min(1, dx / rect.width));
      const clampedY = Math.max(-1, Math.min(1, dy / rect.height));
      setHeadTilt({ rx: -clampedY * maxTilt, ry: clampedX * maxTilt });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stopMouthLoop = useCallback(() => {
    if (mouthIntervalRef.current) {
      window.clearInterval(mouthIntervalRef.current);
      mouthIntervalRef.current = null;
    }
    setMouthOpen(false);
  }, []);

  const handleSpeak = useCallback(() => {
    if (isSpeaking) return;
    setIsSpeaking(true);

    // Fake lip-sync while the browser's TTS engine plays the audio
    mouthIntervalRef.current = window.setInterval(() => {
      setMouthOpen((prev) => !prev);
    }, 130);

    speakRobotGreeting(GREETING, {
      onEnd: () => {
        stopMouthLoop();
        setIsSpeaking(false);
      },
      onError: () => {
        stopMouthLoop();
        setIsSpeaking(false);
      },
    });
  }, [isSpeaking, stopMouthLoop]);

  return (
    <div className="relative w-full h-[480px] md:h-[580px] flex items-center justify-center select-none">
      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-sm glass-card p-3 rounded-2xl border border-blue-400/80 shadow-[0_0_40px_rgba(37,99,235,0.6)] flex items-center gap-3 backdrop-blur-xl bg-navy-950/80"
          >
            <div className="p-2 rounded-xl bg-blue-600/80 text-white flex-shrink-0 animate-bounce">
              <HiVolumeUp className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-mono font-bold tracking-wider text-brand-secondary uppercase">
                  🤖 Robot Speaking...
                </span>
                <AudioWaveform isSpeaking={true} barCount={6} />
              </div>
              <p className="text-xs font-semibold text-white leading-tight truncate">
                "{GREETING}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`absolute inset-0 rounded-3xl transition-all duration-700 pointer-events-none ${
          isSpeaking
            ? 'bg-blue-600/30 blur-3xl shadow-[0_0_100px_rgba(37,99,235,0.6)]'
            : isHovered
            ? 'bg-blue-500/20 blur-2xl shadow-[0_0_60px_rgba(59,130,246,0.3)]'
            : 'bg-blue-900/10 blur-xl'
        }`}
      />

      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleSpeak}
        style={{
          transform: `perspective(900px) rotateX(${headTilt.rx}deg) rotateY(${headTilt.ry}deg)`,
          transition: 'transform 120ms ease-out',
        }}
        className={`relative w-full h-full glass-card rounded-3xl border transition-colors duration-500 overflow-hidden cursor-pointer flex items-center justify-center ${
          isSpeaking
            ? 'border-brand-blue shadow-[0_0_50px_rgba(37,99,235,0.5)]'
            : 'border-blue-500/30 hover:border-blue-400'
        }`}
      >
        <RobotFace eyeOffset={eyeOffset} mouthOpen={mouthOpen} isSpeaking={isSpeaking} />

        {isSpeaking && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-64 h-64 border-2 border-brand-blue/60 rounded-full animate-ring-1" />
            <div className="w-80 h-80 border-2 border-brand-secondary/40 rounded-full animate-ring-2" />
          </div>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-blue-400/60 shadow-blue-glow bg-navy-950/80">
          <span className="p-1 rounded-full bg-blue-600/80 text-white">
            <HiVolumeUp className="w-4 h-4" />
          </span>
          <span className="text-xs font-mono font-semibold text-white tracking-wide">
            {isSpeaking ? 'SPEAKING...' : 'Click the robot to say hello!'}
          </span>
          <HiSparkles className="w-4 h-4 text-brand-secondary animate-pulse" />
        </div>
      </div>
    </div>
  );
};

// Self-contained SVG robot face — eyes track the pointer, mouth animates while speaking
const RobotFace: React.FC<{
  eyeOffset: { x: number; y: number };
  mouthOpen: boolean;
  isSpeaking: boolean;
}> = ({ eyeOffset, mouthOpen, isSpeaking }) => {
  return (
    <svg viewBox="0 0 320 320" width="70%" height="70%" className="drop-shadow-[0_0_30px_rgba(37,99,235,0.35)]">
      <defs>
        <radialGradient id="headGrad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#3b5578" />
          <stop offset="55%" stopColor="#1c2b45" />
          <stop offset="100%" stopColor="#0b1526" />
        </radialGradient>
        <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#2563eb" />
        </radialGradient>
      </defs>

      <line x1="160" y1="20" x2="160" y2="55" stroke="#2563eb" strokeWidth="4" />
      <circle cx="160" cy="16" r="8" fill="#7dd3fc">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
      </circle>

      <rect x="55" y="55" width="210" height="200" rx="36" fill="url(#headGrad)" stroke="#3b82f6" strokeWidth="3" />
      <rect x="35" y="120" width="20" height="60" rx="6" fill="#1c2b45" stroke="#2563eb" strokeWidth="2" />
      <rect x="265" y="120" width="20" height="60" rx="6" fill="#1c2b45" stroke="#2563eb" strokeWidth="2" />
      <rect x="80" y="95" width="160" height="80" rx="24" fill="#050b16" stroke="#1d4ed8" strokeWidth="2" />

      <g transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}>
        <circle cx="125" cy="135" r="16" fill="url(#eyeGlow)" />
        <circle cx="195" cy="135" r="16" fill="url(#eyeGlow)" />
      </g>

      <rect
        x="120"
        y={mouthOpen ? 197 : 200}
        width="80"
        height={mouthOpen ? 26 : 8}
        rx="6"
        fill="#0b1526"
        stroke="#2563eb"
        strokeWidth="2"
        style={{ transition: 'height 90ms ease-out, y 90ms ease-out' }}
      />
      {mouthOpen && (
        <>
          <rect x="128" y="203" width="8" height="16" fill="#3b82f6" opacity="0.7" />
          <rect x="150" y="203" width="8" height="16" fill="#3b82f6" opacity="0.7" />
          <rect x="172" y="203" width="8" height="16" fill="#3b82f6" opacity="0.7" />
          <rect x="184" y="203" width="8" height="16" fill="#3b82f6" opacity="0.7" />
        </>
      )}

      <circle cx="160" cy="290" r="10" fill={isSpeaking ? '#7dd3fc' : '#1d4ed8'}>
        {isSpeaking && <animate attributeName="r" values="8;12;8" dur="0.5s" repeatCount="indefinite" />}
      </circle>
    </svg>
  );
};