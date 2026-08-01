import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4 animate-pulse">
      <div className="flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-2xl bg-surface-200" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-surface-200 rounded-lg w-3/4" />
          <div className="h-3 bg-surface-200 rounded-lg w-1/2" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-3 bg-surface-200 rounded-lg w-full" />
        <div className="h-3 bg-surface-200 rounded-lg w-4/5" />
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <div className="h-3 bg-surface-200 rounded-lg w-1/4" />
        <div className="h-8 bg-surface-200 rounded-xl w-24" />
      </div>
    </div>
  );
};
