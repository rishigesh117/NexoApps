import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden bg-hero-gradient shadow-2xl"
        >
          {/* Subtle Ambient Orbs */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs font-semibold">
              <Mail className="w-3.5 h-3.5" />
              <span>Platform Newsletter</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Stay Updated
            </h2>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Get notified whenever new Android APKs, AI tools, web apps, or major Batlytics updates are released.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 pt-4 max-w-md mx-auto">
              <div className="relative w-full">
                <Mail className="w-4 h-4 text-text-muted absolute left-4 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-surface-100 border border-white/10 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-cyan to-brand-blue font-bold text-xs text-white shadow-glow-cyan hover:opacity-95 transition-all flex items-center justify-center gap-2 shrink-0"
              >
                {subscribed ? (
                  <span className="flex items-center gap-1.5 text-brand-emerald">
                    <CheckCircle2 className="w-4 h-4" /> Subscribed!
                  </span>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <span className="text-[11px] text-text-muted block pt-2">
              Zero spam. Unsubscribe at any time. UI subscription blueprint.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
