import React from 'react';

export const ReviewSkeleton: React.FC = () => {
  return (
    <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10" />
          <div className="space-y-2">
            <div className="h-4 w-28 bg-white/10 rounded" />
            <div className="h-3 w-16 bg-white/10 rounded" />
          </div>
        </div>
        <div className="h-4 w-20 bg-white/10 rounded" />
      </div>
      <div className="h-5 w-3/4 bg-white/10 rounded" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-white/10 rounded" />
        <div className="h-3 w-5/6 bg-white/10 rounded" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-8 w-24 bg-white/10 rounded-full" />
        <div className="h-4 w-16 bg-white/10 rounded" />
      </div>
    </div>
  );
};
