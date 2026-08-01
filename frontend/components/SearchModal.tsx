import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Smartphone, Cpu, Globe, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const quickSearchTags = ['Batlytics', 'Cricket', 'AI Assistant', 'Web Dashboard', 'Android APK'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-background/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl glass-panel rounded-2xl p-6 border border-white/10 shadow-2xl relative"
          >
            {/* Header / Input */}
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <Search className="w-5 h-5 text-brand-cyan shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search applications, categories, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-text-muted focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-surface-200 text-text-muted hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Tags */}
            <div className="pt-4 space-y-3">
              <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {quickSearchTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    className="px-3 py-1.5 rounded-xl bg-surface-100 hover:bg-surface-200 border border-white/5 text-xs text-text-secondary hover:text-white transition-all flex items-center gap-1.5"
                  >
                    <span>{tag}</span>
                    <ArrowRight className="w-3 h-3 text-brand-cyan" />
                  </button>
                ))}
              </div>
            </div>

            {/* Note UI only */}
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[11px] text-text-muted">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-surface-200 text-white">ESC</kbd> to close</span>
              <span>Search UI Preview</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
