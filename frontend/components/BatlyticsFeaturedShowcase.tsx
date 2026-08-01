import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AppItem } from '../types';
import { PlatformBadge } from './PlatformBadge';
import { Star, Download, ShieldCheck, CheckCircle2, Trophy, BarChart3, Smartphone, Play, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SignupModal } from './SignupModal';

interface BatlyticsFeaturedShowcaseProps {
  app: AppItem;
}

export const BatlyticsFeaturedShowcase: React.FC<BatlyticsFeaturedShowcaseProps> = ({ app }) => {
  const { isAuthenticated, role } = useAuth();
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleDownloadClick = (e: React.MouseEvent) => {
    if (!isAuthenticated || role === 'GUEST') {
      e.preventDefault();
      setIsSignupModalOpen(true);
    }
  };

  return (
    <>
      <section id="featured-batlytics" className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Title Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20 text-xs font-semibold uppercase tracking-wider mb-2">
                <Trophy className="w-3.5 h-3.5" />
                Featured Initial App
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Batlytics – <span className="text-brand-emerald">Cricket Scoring App</span>
              </h2>
            </div>
            <p className="text-xs text-text-muted max-w-md">
              The first featured application on NexoApps platform, engineered for match scoring, player strike-rate metrics, and automated PDF summaries.
            </p>
          </div>

          {/* Showcase Card Banner */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden glass-panel border border-brand-emerald/30 shadow-glow-emerald bg-batlytics-gradient"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10">
              
              {/* Left Column: App Information & Features */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                
                <div>
                  {/* Badges Bar */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <PlatformBadge platform="Android" />
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-200 text-white border border-white/10">
                      Version {app.version}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/30 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> APK Ready ({app.fileSize})
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
                    {app.title}
                  </h3>
                  <p className="text-sm sm:text-base font-medium text-brand-cyan mb-4">
                    {app.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                    {app.description}
                  </p>

                  {/* Key Feature List */}
                  <div className="space-y-2.5 mb-6">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Core Features</h4>
                    {app.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-emerald mt-0.5 shrink-0" />
                        <span className="text-xs sm:text-sm text-text-primary font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating & Play Store Ready Download Buttons */}
                <div className="pt-4 border-t border-white/10 flex flex-col space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-bold text-white">{app.rating}</span>
                      <span className="text-xs text-text-muted">({app.totalReviews} reviews)</span>
                    </div>
                    <div className="text-xs text-text-secondary">
                      <span className="font-bold text-white">{app.downloadsCount.toLocaleString()}+</span> Downloads
                    </div>
                  </div>

                  {/* Dual Buttons: Download APK (Gated for Members) + Google Play Store (Coming Soon) */}
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={app.downloadUrl}
                      onClick={handleDownloadClick}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-emerald to-brand-cyan text-white text-xs font-bold shadow-glow-emerald hover:opacity-95 transition-all flex items-center justify-center gap-2"
                    >
                      {role === 'GUEST' ? <Lock className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                      <span>{role === 'GUEST' ? `Sign Up to Download APK (${app.fileSize})` : `Download APK (${app.fileSize})`}</span>
                    </a>

                    <button
                      disabled
                      aria-label="Download from Google Play Store (Coming Soon)"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-surface-200/60 border border-white/10 text-text-muted text-xs font-bold cursor-not-allowed opacity-70 flex items-center justify-center gap-2 relative group"
                    >
                      <Play className="w-4 h-4 text-emerald-400 fill-emerald-400 opacity-50" />
                      <span>Download from Google Play</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                        Coming Soon
                      </span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: Visual Mockup / Analytics Preview */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="relative rounded-2xl overflow-hidden glass-card p-4 border border-white/10 bg-surface-100/90 shadow-2xl">
                  
                  {/* Mockup Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🏏</span>
                      <div>
                        <h4 className="text-xs font-bold text-white">Batlytics Live Match Dashboard</h4>
                        <span className="text-[10px] text-brand-emerald">T20 League • In Progress</span>
                      </div>
                    </div>
                    <BarChart3 className="w-5 h-5 text-brand-cyan" />
                  </div>

                  {/* Scorecard Widget Preview */}
                  <div className="bg-background/80 rounded-xl p-4 border border-white/5 space-y-3 mb-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">Royal Strikers</span>
                      <span className="font-extrabold text-brand-emerald text-sm">184 / 4 (18.4 overs)</span>
                    </div>
                    <div className="w-full bg-surface-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-brand-emerald to-brand-cyan h-full w-[92%]" />
                    </div>
                    <div className="flex justify-between text-[11px] text-text-muted pt-1">
                      <span>CRR: 9.85</span>
                      <span>Req RR: 11.20</span>
                      <span>Target: 198</span>
                    </div>
                  </div>

                  {/* Screenshot Thumbnails */}
                  <div className="grid grid-cols-3 gap-2">
                    {app.screenshots.map((src, index) => (
                      <div key={index} className="aspect-[3/4] rounded-lg overflow-hidden border border-white/10 relative group">
                        <img
                          src={src}
                          alt={`Batlytics Screenshot ${index + 1}`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-text-muted">
                    <span className="flex items-center gap-1 text-brand-cyan">
                      <Smartphone className="w-3.5 h-3.5" /> Tested on Android 8.0+
                    </span>
                    <span>Pure Offline Logic</span>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Signup Prompt Modal for Guest Users */}
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        returnUrl="/app/batlytics"
      />
    </>
  );
};
