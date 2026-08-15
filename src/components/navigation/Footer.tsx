import React from 'react';
import { HiArrowUp, HiDownload } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { socialLinks } from '../../data/socialLinks';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050811] pt-16 pb-12 border-t border-blue-500/30 overflow-hidden text-white">
      {/* Top ambient blue gradient line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-secondary via-brand-blue to-indigo-600 shadow-[0_0_15px_#2563EB]" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-blue text-white font-extrabold flex items-center justify-center text-xs shadow-blue-glow">
                AP
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                AKASH <span className="text-brand-blue">PANDEY</span>
              </h3>
            </div>
            <p className="text-sm font-medium text-slate-400">
              Software Developer & React.js Developer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-navy-900 border border-blue-900/60 text-slate-200 hover:bg-brand-blue hover:text-white transition-all shadow-sm hover:scale-110"
              aria-label="GitHub Profile"
            >
              <SiGithub className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-navy-900 border border-blue-900/60 text-slate-200 hover:bg-brand-blue hover:text-white transition-all shadow-sm hover:scale-110"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${socialLinks.email}`}
              className="p-3 rounded-full bg-navy-900 border border-blue-900/60 text-slate-200 hover:bg-brand-blue hover:text-white transition-all shadow-sm hover:scale-110"
              aria-label="Send Email"
            >
              <MdEmail className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.resume}
              download="Akash_Pandey_Resume.pdf"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-950/80 text-brand-secondary font-bold text-xs border border-blue-500/40 hover:bg-brand-blue hover:text-white transition-all shadow-sm hover:scale-105"
            >
              <HiDownload className="w-4 h-4" />
              <span>Resume PDF</span>
            </a>
          </div>

          {/* Back to Top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-navy-900 border border-blue-900/60 text-slate-200 hover:bg-brand-blue hover:text-white font-bold text-xs transition-all shadow-sm group"
          >
            <span>Back to Top</span>
            <HiArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-xs font-mono text-slate-400 font-semibold flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Akash Pandey. All rights reserved.</p>
          <p className="text-brand-secondary font-bold">Designed & Developed by Akash Pandey</p>
        </div>
      </div>
    </footer>
  );
};
