import React from 'react';
import { AIModel } from '../../types';
import { Boxes, Rocket, GitBranch, Shield } from 'lucide-react';
import Link from 'next/link';

interface ModelCardProps {
  model: AIModel;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-brand-cyan/40 transition-all space-y-4 flex flex-col justify-between text-left shadow-2xl">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
            {model.taskType}
          </span>
          <span className="text-[10px] font-bold text-text-muted flex items-center gap-1">
            <Shield className="w-3 h-3 text-emerald-400" /> {model.license}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="font-extrabold text-white text-base leading-tight">{model.name}</h3>
          <p className="text-xs text-text-muted font-mono">{model.framework}</p>
          <p className="text-xs text-text-secondary line-clamp-2 pt-1">{model.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs text-text-muted">
        <span className="flex items-center gap-1 font-bold text-white">
          <GitBranch className="w-3.5 h-3.5 text-brand-violet" /> {model.versionsCount || 1} Versions
        </span>

        <Link
          href={`/ai-platform/deployments?modelId=${model.id}`}
          className="px-4 py-1.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1 transition-all"
        >
          <Rocket className="w-3.5 h-3.5" />
          <span>Deploy Model</span>
        </Link>
      </div>
    </div>
  );
};
