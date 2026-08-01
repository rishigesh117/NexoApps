import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Cpu, GraduationCap, Wrench, Briefcase, Gamepad2, ArrowRight } from 'lucide-react';

export const PopularCategories: React.FC = () => {
  const categories = [
    { title: 'Sports', count: '1 Featured App', icon: Trophy, color: 'from-emerald-500/20 to-teal-500/5', border: 'border-emerald-500/30', iconColor: 'text-emerald-400' },
    { title: 'AI', count: '2 Models', icon: Cpu, color: 'from-purple-500/20 to-indigo-500/5', border: 'border-purple-500/30', iconColor: 'text-purple-400' },
    { title: 'Education', count: '3 Portals', icon: GraduationCap, color: 'from-blue-500/20 to-cyan-500/5', border: 'border-blue-500/30', iconColor: 'text-blue-400' },
    { title: 'Utilities', count: '4 Tools', icon: Wrench, color: 'from-cyan-500/20 to-sky-500/5', border: 'border-cyan-500/30', iconColor: 'text-cyan-400' },
    { title: 'Business', count: '2 Dashboards', icon: Briefcase, color: 'from-violet-500/20 to-fuchsia-500/5', border: 'border-violet-500/30', iconColor: 'text-violet-400' },
    { title: 'Games', count: 'Coming Soon', icon: Gamepad2, color: 'from-amber-500/20 to-orange-500/5', border: 'border-amber-500/30', iconColor: 'text-amber-400' },
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-1 block">
              Ecosystem Taxonomy
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Popular Categories
            </h2>
          </div>
          <p className="text-xs text-text-muted max-w-md">
            Explore applications grouped by domain. Engineered to support hundreds of future releases.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => {
            const IconComponent = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`glass-card p-6 rounded-3xl border ${cat.border} bg-gradient-to-br ${cat.color} flex items-center justify-between group cursor-pointer`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-surface-200 border border-white/10 flex items-center justify-center shadow-inner shrink-0 group-hover:scale-110 transition-transform">
                    <IconComponent className={`w-6 h-6 ${cat.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-cyan transition-colors">
                      {cat.title}
                    </h3>
                    <span className="text-xs text-text-muted font-medium">{cat.count}</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-surface-200 text-text-muted group-hover:text-white group-hover:bg-brand-cyan/20 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
