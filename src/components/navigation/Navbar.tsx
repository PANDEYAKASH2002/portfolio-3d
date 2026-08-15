import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiDownload } from 'react-icons/hi';
import { socialLinks } from '../../data/socialLinks';

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[9000] flex justify-center px-4 pt-4 transition-all duration-500">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`w-full max-w-6xl glass-nav rounded-full px-6 transition-all duration-300 flex items-center justify-between ${
          isScrolled ? 'py-2.5 shadow-blue-glow border-blue-500/50 bg-navy-950/90' : 'py-4 border-blue-500/30 bg-navy-950/70'
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, '#hero')}
          className="group flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-full bg-brand-blue text-white font-extrabold flex items-center justify-center text-sm shadow-[0_0_15px_#2563EB] group-hover:scale-105 transition-transform">
            AP
          </div>
          <span className="font-extrabold text-white tracking-tight text-base group-hover:text-brand-secondary transition-colors">
            AKASH<span className="text-brand-blue">.DEV</span>
          </span>
        </a>

        {/* Desktop Nav Items */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                    isActive ? 'text-brand-secondary' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-blue-900/60 border border-blue-500/50 rounded-full -z-10 shadow-sm"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Resume Download Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={socialLinks.resume}
            download="Akash_Pandey_Resume.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue text-white text-xs font-bold tracking-wide hover:bg-brand-blue-hover transition-all shadow-[0_4px_14px_rgba(37,99,235,0.4)] hover:shadow-blue-glow-lg hover:scale-105"
          >
            <HiDownload className="w-4 h-4" />
            <span>RESUME</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-white hover:text-brand-secondary hover:bg-blue-950/60 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-[8999] glass-card p-6 rounded-3xl border border-blue-500/40 shadow-blue-glow md:hidden flex flex-col gap-4 bg-navy-950/95"
          >
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="block px-4 py-3 text-base font-bold text-white hover:text-brand-secondary hover:bg-blue-900/50 rounded-xl transition-all"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-slate-800">
              <a
                href={socialLinks.resume}
                download="Akash_Pandey_Resume.pdf"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-blue text-white font-bold text-sm shadow-blue-glow"
              >
                <HiDownload className="w-4 h-4" />
                <span>DOWNLOAD RESUME PDF</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
