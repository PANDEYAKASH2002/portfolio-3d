import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glow = false,
  ...props
}) => {
  return (
    <motion.div
      className={`glass-card rounded-2xl p-6 relative overflow-hidden transition-all duration-300 ${
        glow ? 'border-brand-blue/30 shadow-blue-glow' : 'border-blue-100/70 shadow-glass'
      } ${className}`}
      {...props}
    >
      {/* Soft internal gradient ambient light */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-light/30 rounded-full blur-3xl pointer-events-none" />
      {children}
    </motion.div>
  );
};
