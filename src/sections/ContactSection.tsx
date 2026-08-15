import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';
import { GlassCard } from '../components/ui/GlassCard';
import { sendContactEmail } from '../utils/emailService';
import { socialLinks } from '../data/socialLinks';
import { ContactFormData } from '../types/portfolio';
import {
  HiMail,
  HiLocationMarker,
  HiPaperAirplane,
  HiCheckCircle,
  HiExclamationCircle,
  HiDownload,
} from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    const success = await sendContactEmail(formData);
    setLoading(false);

    if (success) {
      setSubmitted(true);
      // Trigger celebrate blue confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#3B82F6', '#60A5FA', '#DBEAFE'],
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setErrorMsg('Failed to send message. Please try emailing directly.');
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 relative bg-slate-50/60 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-brand-light/30 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200"
          >
            <HiMail className="w-4 h-4 text-brand-blue" />
            <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-wider">
              CONNECT & COLLABORATE
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-navy-900 tracking-tight"
          >
            LET'S BUILD <span className="text-brand-blue">SOMETHING TOGETHER</span>
          </motion.h2>

          <p className="text-sm font-medium text-navy-600 max-w-lg mx-auto">
            Have a project, full-time role opportunity, or technical inquiry? Send a direct message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <GlassCard glow className="space-y-6">
              <h3 className="text-2xl font-extrabold text-navy-900">
                Contact Information
              </h3>

              <div className="space-y-4 text-sm font-medium text-navy-800">
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 hover:bg-brand-blue hover:text-white transition-all group"
                >
                  <div className="p-2 rounded-lg bg-brand-blue text-white group-hover:bg-white group-hover:text-brand-blue transition-colors">
                    <HiMail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono font-bold uppercase text-navy-700 group-hover:text-blue-100">
                      Email Address
                    </div>
                    <div className="font-bold truncate">{socialLinks.email}</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/70 border border-blue-200/80">
                  <div className="p-2 rounded-lg bg-brand-blue text-white">
                    <HiLocationMarker className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono font-bold uppercase text-navy-700">Location</div>
                    <div className="font-bold">Surat, Gujarat, India</div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <span className="text-xs text-black font-mono font-bold text-navy-700 uppercase tracking-wider block">
                  Official Profiles & Resume
                </span>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-xs hover:bg-navy-800 transition-all shadow-sm"
                  >
                    <SiGithub className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A66C2] text-white font-bold text-xs hover:opacity-90 transition-all shadow-sm"
                  >
                    <FaLinkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={socialLinks.resume}
                    download="Akash_Pandey_Resume.pdf"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-xs shadow-blue-glow hover:bg-brand-blue-hover transition-all"
                  >
                    <HiDownload className="w-4 h-4" />
                    <span>Resume</span>
                  </a>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <GlassCard glow className="space-y-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-100 text-brand-blue flex items-center justify-center mx-auto shadow-blue-glow">
                    <HiCheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-navy-900">Message Sent Successfully!</h3>
                  <p className="text-navy-700 text-sm max-w-md mx-auto">
                    Thank you for reaching out, Akash Pandey has received your message and will respond shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-brand-blue text-white font-bold text-xs shadow-blue-glow hover:bg-brand-blue-hover transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs font-semibold flex items-center gap-2">
                      <HiExclamationCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-navy-800 uppercase">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-blue focus:bg-white text-navy-900 text-sm font-medium outline-none transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-navy-800 uppercase">Your Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-blue focus:bg-white text-navy-900 text-sm font-medium outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-navy-800 uppercase">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Opportunity / Hiring Inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-blue focus:bg-white text-navy-900 text-sm font-medium outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-navy-800 uppercase">Message *</label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-blue focus:bg-white text-navy-900 text-sm font-medium outline-none transition-all resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-blue text-white font-extrabold text-sm tracking-wider uppercase shadow-[0_10px_25px_rgba(37,99,235,0.4)] hover:shadow-blue-glow-lg hover:bg-brand-blue-hover transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <span>SENDING MESSAGE...</span>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <HiPaperAirplane className="w-4 h-4 rotate-45" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
