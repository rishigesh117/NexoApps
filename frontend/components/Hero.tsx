import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Smartphone, Cpu, Globe, Monitor, ShieldCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-hero-gradient">
      
      {/* Nothing OS / Vercel style Floating Shapes & Glow Orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-cyan/20 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-brand-violet/20 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Floating Geometry Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="absolute top-10 left-[10%] w-16 h-16 rounded-2xl glass-card border border-white/10"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-12 right-[12%] w-20 h-20 rounded-full glass-card border border-brand-cyan/20"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Platform Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-cyan/30 text-xs font-semibold text-brand-cyan shadow-glow-cyan"
          >
            <Sparkles className="w-4 h-4 text-brand-cyan" />
            <span>NexoApps Platform • Premium Multi-App Engine</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
          >
            Discover <span className="gradient-text">Amazing Apps</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-xl text-text-secondary leading-relaxed font-normal"
          >
            One platform for all my Android, AI, Web and Desktop applications.
          </motion.p>

          {/* Buttons: Explore Apps & Learn More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a
              href="#categories"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet font-bold text-sm text-white shadow-glow-cyan hover:opacity-95 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Apps</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#why-us"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-surface-100/90 border border-white/10 hover:border-brand-cyan/40 font-bold text-sm text-white hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Learn More
            </a>
          </motion.div>

          {/* Platform Category Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-6 text-xs text-text-muted"
          >
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-100 border border-white/5">
              <Smartphone className="w-3.5 h-3.5 text-brand-emerald" /> Android APKs
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-100 border border-white/5">
              <Cpu className="w-3.5 h-3.5 text-brand-violet" /> AI Models
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-100 border border-white/5">
              <Globe className="w-3.5 h-3.5 text-brand-cyan" /> Web Portals
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-100 border border-white/5">
              <Monitor className="w-3.5 h-3.5 text-brand-blue" /> Desktop Software
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
