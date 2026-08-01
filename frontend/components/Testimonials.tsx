import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Cricket Tournament Organizer',
      appUsed: 'Batlytics',
      comment: 'Batlytics completely revolutionized match scoring for our regional league. The PDF match summary and live worm charts are ultra-crisp and instant!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    },
    {
      name: 'Alex Chen',
      role: 'Fullstack Engineer',
      appUsed: 'CodeVault Desktop',
      comment: 'NexoApps platform UI feels like Nothing OS meets Stripe. Clean, fast direct APK downloads without popups or deceptive ad redirects.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    },
    {
      name: 'Sophia Patel',
      role: 'AI Researcher',
      appUsed: 'Nexus AI Studio',
      comment: 'Having a single custom platform for all independent apps, AI models, and college research projects is brilliant. Looking forward to QuantumFlow AI!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wider block">
            User Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What Users Say
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Real feedback from developers, sports managers, and users exploring NexoApps products.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6 relative"
            >
              <Quote className="w-8 h-8 text-brand-cyan/20 absolute top-6 right-6" />

              <div className="space-y-4">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed italic">
                  "{test.comment}"
                </p>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-10 h-10 rounded-full object-cover border border-brand-cyan/30"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{test.name}</h4>
                  <span className="text-[10px] text-text-muted">{test.role} • <strong className="text-brand-cyan">{test.appUsed}</strong></span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
