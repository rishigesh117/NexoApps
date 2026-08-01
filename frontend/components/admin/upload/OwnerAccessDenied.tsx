import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

export const OwnerAccessDenied: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-panel p-8 sm:p-12 rounded-3xl border border-rose-500/20 max-w-md w-full text-center space-y-6 shadow-2xl relative z-10"
      >
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white tracking-tight">Access Denied</h2>
          <p className="text-sm font-medium text-rose-300">
            Only the owner of NexoApps can upload applications.
          </p>
        </div>

        <p className="text-xs text-text-secondary leading-relaxed">
          You are currently signed in with an account that does not have application publishing permissions. If you believe this is an error, please contact system administration.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
