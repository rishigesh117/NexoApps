import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Image,
  FileCode,
  Store,
  ListChecks,
  FileCheck,
  Eye,
  Rocket,
  CheckCircle2,
} from 'lucide-react';

interface UploadWizardHeaderProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export const WIZARD_STEPS = [
  { id: 1, label: 'Basic Info', icon: <FileText className="w-3.5 h-3.5" /> },
  { id: 2, label: 'Media', icon: <Image className="w-3.5 h-3.5" /> },
  { id: 3, label: 'APK File', icon: <FileCode className="w-3.5 h-3.5" /> },
  { id: 4, label: 'Store Info', icon: <Store className="w-3.5 h-3.5" /> },
  { id: 5, label: 'Features', icon: <ListChecks className="w-3.5 h-3.5" /> },
  { id: 6, label: 'Release Notes', icon: <FileCheck className="w-3.5 h-3.5" /> },
  { id: 7, label: 'Store Preview', icon: <Eye className="w-3.5 h-3.5" /> },
  { id: 8, label: 'Publish', icon: <Rocket className="w-3.5 h-3.5" /> },
];

export const UploadWizardHeader: React.FC<UploadWizardHeaderProps> = ({
  currentStep,
  onStepClick,
}) => {
  const progressPercentage = Math.round(((currentStep - 1) / (WIZARD_STEPS.length - 1)) * 100);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6 text-left">
      {/* Top Title & Progress Percentage */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <Rocket className="w-5 h-5 text-brand-cyan" /> Google Play Console — Owner Upload Portal
          </h2>
          <p className="text-xs text-text-secondary">
            Step {currentStep} of 8 — {WIZARD_STEPS[currentStep - 1].label}
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono font-bold text-brand-cyan">{progressPercentage}% Completed</span>
          <div className="w-32 h-2 rounded-full bg-white/10 overflow-hidden mt-1">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Stepper Buttons Container */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {WIZARD_STEPS.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className={`p-2.5 rounded-2xl flex flex-col items-center gap-1.5 text-center transition-all ${
                isCurrent
                  ? 'bg-gradient-to-tr from-brand-cyan/20 to-brand-violet/20 border border-brand-cyan/40 text-white shadow-glow-cyan'
                  : isCompleted
                  ? 'bg-white/5 border border-emerald-500/30 text-emerald-400 hover:bg-white/10'
                  : 'bg-white/5 border border-white/5 text-text-muted hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-1">
                {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : step.icon}
                <span className="text-[10px] font-bold">Step {step.id}</span>
              </div>
              <span className="text-[11px] font-semibold truncate w-full">{step.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
