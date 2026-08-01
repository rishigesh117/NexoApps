import React from 'react';
import { cn } from '../utils/cn';

interface PlatformBadgeProps {
  platform: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({ platform, className, size = 'md' }) => {
  const getBadgeStyle = (name: string) => {
    switch (name.toLowerCase()) {
      case 'android':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'web':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'windows':
      case 'desktop':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'macos':
      case 'linux':
        return 'bg-violet-500/10 text-violet-400 border-violet-500/30';
      case 'ai apps':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-500/10 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border backdrop-blur-xs',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs',
        getBadgeStyle(platform),
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {platform}
    </span>
  );
};
