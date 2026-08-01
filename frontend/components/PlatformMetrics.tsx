import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Download, Users, Star } from 'lucide-react';

export const PlatformMetrics: React.FC = () => {
  const metrics = [
    { label: 'Published Applications', value: '100+', subText: 'Ready Ecosystem', icon: Layers, color: 'text-brand-cyan' },
    { label: 'Total App Downloads', value: '25,000+', subText: 'High Speed Direct DLS', icon: Download, color: 'text-brand-emerald' },
    { label: 'Active Platform Users', value: '10,000+', subText: 'Community Members', icon: Users, color: 'text-brand-blue' },
    { label: 'Positive User Reviews', value: '4.9 ★', subText: '98% Satisfaction Rate', icon: Star, color: 'text-amber-400' },
  ];

  return (
    <section className="py-12 border-y border-white/10 bg-surface-50/40 my-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => {
            const IconComp = metric.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-card p-6 rounded-3xl border border-white/5 flex items-center gap-4 group"
              >
                <div className="p-3.5 rounded-2xl bg-surface-200 border border-white/10 shrink-0 group-hover:scale-110 transition-transform">
                  <IconComp className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div>
                  <h4 className="text-2xl font-extrabold text-white tracking-tight">{metric.value}</h4>
                  <p className="text-xs font-semibold text-text-primary mt-0.5">{metric.label}</p>
                  <span className="text-[10px] text-text-muted">{metric.subText}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
