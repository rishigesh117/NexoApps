import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers } from 'lucide-react';

interface SplashScreenProps {
  onComplete?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-white select-none"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-[400px] h-[400px] bg-brand-cyan/20 rounded-full blur-[140px] pointer-events-none" />

          {/* Logo & Icon Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center gap-4 relative z-10"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-cyan via-brand-blue to-brand-violet p-0.5 shadow-glow-cyan">
                <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center">
                  <Layers className="w-8 h-8 text-brand-cyan animate-pulse" />
                </div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 rounded-2xl bg-brand-cyan/30 blur-md pointer-events-none"
              />
            </div>

            <div className="text-center">
              <h1 className="font-display text-3xl font-extrabold tracking-tight">
                Nexo<span className="text-brand-cyan">Apps</span>
              </h1>
              <p className="text-xs text-text-muted tracking-widest uppercase mt-1">
                Software Ecosystem
              </p>
            </div>
          </motion.div>

          {/* Loading Bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 140 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="h-1 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet rounded-full mt-8"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
