import React from 'react';
import { MediaProcessingState } from '../../../types';
import { Image as ImageIcon, CheckCircle2, Zap, HardDrive } from 'lucide-react';

interface MediaProcessorProps {
  stats: MediaProcessingState;
}

export const MediaProcessor: React.FC<MediaProcessorProps> = ({ stats }) => {
  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-left text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5 font-bold text-white">
          <ImageIcon className="w-4 h-4 text-brand-cyan" /> WEBP Compression & Thumbnail Pipeline
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Optimized Format: WEBP
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
          <span className="text-[10px] text-text-muted block font-semibold">Original Size</span>
          <span className="font-bold text-white font-mono">{stats.originalSizeMb || 2.4} MB</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
          <span className="text-[10px] text-text-muted block font-semibold">Compressed Size</span>
          <span className="font-bold text-emerald-400 font-mono">{stats.compressedSizeMb || 0.8} MB</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
          <span className="text-[10px] text-text-muted block font-semibold">Bandwidth Saved</span>
          <span className="font-bold text-brand-cyan font-mono">-{stats.savedPercentage || 65}%</span>
        </div>
      </div>
    </div>
  );
};
