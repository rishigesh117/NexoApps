import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers } from 'lucide-react';
import { SignupForm } from './SignupForm';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
  returnUrl?: string;
}

export const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
  returnUrl,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="signup-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md overflow-y-auto max-h-screen py-10"
        >
          {/* Backdrop Click */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative my-auto z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close signup modal"
              className="absolute top-6 right-6 p-2 rounded-xl bg-surface-200 text-text-muted hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-cyan/40"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center text-center mb-6 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-cyan via-brand-blue to-brand-violet p-0.5 shadow-glow-cyan">
                <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center">
                  <Layers className="w-6 h-6 text-brand-cyan" />
                </div>
              </div>
              <h3 id="signup-modal-title" className="text-2xl font-bold text-white">
                Create NexoApps Account
              </h3>
              <p className="text-xs text-text-muted">
                Join the platform to download APKs and review apps
              </p>
            </div>

            {/* Reusable Form */}
            <SignupForm
              onSuccess={onClose}
              onSwitchToLogin={onSwitchToLogin}
              returnUrl={returnUrl}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
