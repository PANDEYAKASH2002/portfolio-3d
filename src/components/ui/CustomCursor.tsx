import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (
      window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
      'ontouchstart' in window
    ) {
      setIsTouchDevice(true);
      return;
    }

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactiveParent = target.closest('button, a, [role="button"], .interactive-3d');
      setIsHovered(!!interactiveParent);
    };

    window.addEventListener('mousemove', updateCursor, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none">
      {/* Small blue center dot */}
      <motion.div
        className="absolute top-0 left-0 w-3 h-3 bg-brand-blue rounded-full pointer-events-none shadow-[0_0_10px_#2563EB]"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isClicking ? 0.7 : isHovered ? 1.4 : 1,
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 450, mass: 0.05 }}
      />
      {/* Outer expanding glowing ring */}
      <motion.div
        className="absolute top-0 left-0 w-8 h-8 border-2 border-brand-blue/50 rounded-full pointer-events-none"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovered ? 1.8 : isClicking ? 0.8 : 1,
          borderColor: isHovered ? 'rgba(37, 99, 235, 0.8)' : 'rgba(59, 130, 246, 0.4)',
          backgroundColor: isHovered ? 'rgba(219, 234, 254, 0.2)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 350, mass: 0.1 }}
      />
    </div>
  );
};
