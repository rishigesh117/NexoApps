import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface Props {
  version?: string;
  isLTS?: boolean;
}

export const LTSStatusBadge: React.FC<Props> = ({ version = '4.0.0-LTS', isLTS = true }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 via-brand-cyan/20 to-brand-violet/20 border border-emerald-500/30 shadow-glow-cyan">
      <ShieldCheck className="w-4 h-4 text-emerald-400" />
      <span className="text-xs font-black tracking-wider uppercase text-white flex items-center gap-1">
        Version {version} {isLTS && <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />}
      </span>
    </div>
  );
};
