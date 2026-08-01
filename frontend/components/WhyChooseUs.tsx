import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Sparkles, RefreshCw, Palette } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: 'Premium Apps',
      description: 'Crafted with extreme attention to UX, performance, and clean code standards.',
      icon: Sparkles,
      color: 'text-brand-cyan',
      glow: 'shadow-glow-cyan',
    },
    {
      title: 'Fast Downloads',
      description: 'Direct high-speed APK and application downloads with zero third-party ads.',
      icon: Zap,
      color: 'text-amber-400',
      glow: 'shadow-glow-emerald',
    },
    {
      title: 'Secure Platform',
      description: 'Built on PostgreSQL, JWT architecture, and strict security headers.',
      icon: ShieldCheck,
      color: 'text-brand-emerald',
      glow: 'shadow-glow-emerald',
    },
    {
      title: 'Future Updates',
      description: 'Continuous improvements, patch notes, and automated app updates.',
      icon: RefreshCw,
      color: 'text-brand-violet',
      glow: 'shadow-glow-violet',
    },
    {
      title: 'Modern Design',
      description: 'Inspired by Stripe, Apple, Vercel & Nothing OS for an elite experience.',
      icon: Palette,
      color: 'text-brand-blue',
      glow: 'shadow-glow-cyan',
    },
  ];

  return (
    <section id="why-us" className="py-16 relative bg-surface-50/30 border-y border-white/5 my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wider block">
            Platform Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Choose <span className="gradient-text">NexoApps</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Built as a trusted, independent software platform for personal products and innovation.
          </p>
        </div>

        {/* Pillars Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between space-y-4 relative group"
              >
                <div className="w-12 h-12 rounded-2xl bg-surface-200 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                  <IconComponent className={`w-6 h-6 ${pillar.color}`} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white mb-2 group-hover:text-brand-cyan transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
