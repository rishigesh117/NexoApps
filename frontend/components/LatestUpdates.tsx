import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LatestUpdates: React.FC = () => {
  const updates = [
    {
      version: 'v1.0.0-beta',
      date: 'July 25, 2026',
      title: 'Batlytics Live Scoring & PDF Export Engine',
      description: 'Major feature release for Batlytics. Added ball-by-ball express scorekeeping, strike rate analytics, Manhattan graphs, and instant match PDF summary generation.',
      category: 'Android App Update',
    },
    {
      version: 'v0.9.0',
      date: 'June 15, 2026',
      title: 'Nexus AI Studio Prompt Ecosystem',
      description: 'Launched multi-modal AI prompt library, contextual code snippet summary generators, and Markdown report exporter.',
      category: 'AI Tool Update',
    },
    {
      version: 'v1.2.0',
      date: 'May 10, 2026',
      title: 'Nexo Dashboard Real-Time WebSockets',
      description: 'Upgraded cloud server telemetry metrics with low-latency WebSocket data streams and custom widget grid layouts.',
      category: 'Web App Update',
    },
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-1 block">
              Release Log
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Latest Updates
            </h2>
          </div>
          <p className="text-xs text-text-muted max-w-md">
            Stay informed with recent application feature updates, patch notes, and release milestones.
          </p>
        </div>

        {/* Update Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {updates.map((upd, idx) => (
            <motion.div
              key={upd.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                    {upd.version}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-text-muted">
                    <Calendar className="w-3.5 h-3.5" /> {upd.date}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-cyan transition-colors mb-2">
                  {upd.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {upd.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-medium text-text-muted">{upd.category}</span>
                <button className="text-xs font-semibold text-brand-cyan flex items-center gap-1 hover:underline">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
