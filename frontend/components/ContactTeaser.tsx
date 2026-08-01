import React, { useState } from 'react';
import { Send, MessageSquare, Sparkles } from 'lucide-react';

export const ContactTeaser: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden bg-hero-gradient">
          
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs font-semibold">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Suggestions & Contact</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">Have a Feature Suggestion or Inquiry?</h2>
            <p className="text-xs sm:text-sm text-text-secondary">
              Direct line to the platform owner. Send feedback on **Batlytics** or request future apps.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Subject</label>
              <input
                type="text"
                required
                placeholder="Batlytics Feature Suggestion / Feedback"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Message</label>
              <textarea
                rows={4}
                required
                placeholder="Share your thoughts or request a feature..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue font-bold text-xs text-white shadow-glow-cyan hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              {submitted ? (
                <span className="flex items-center gap-2 text-brand-emerald">
                  <Sparkles className="w-4 h-4" /> Suggestion Received!
                </span>
              ) : (
                <>
                  <span>Send Suggestion to Owner</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};
