import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Image as ImageIcon } from 'lucide-react';

interface ProcessingProgressProps {
  isProcessing: boolean;
  progress: number;
  currentStep: string;
}

export const ProcessingProgress: React.FC<ProcessingProgressProps> = ({
  isProcessing,
  progress,
  currentStep,
}) => {
  if (!isProcessing && progress === 0) return null;

  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-left">
      <div className="flex items-center justify-between">
        <span className="font-bold text-white flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-cyan" /> {currentStep}
        </span>
        <span className="font-mono text-brand-cyan font-bold">{progress}%</span>
      </div>

      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-cyan to-brand-violet rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
};
