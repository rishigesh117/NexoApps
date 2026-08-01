import React from 'react';
import { PackageSearch, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  onReset?: () => void;
  ctaText?: string;
  ctaHref?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Applications Found',
  subtitle = 'We couldn’t find any applications matching your active filters.',
  onReset,
  ctaText = 'Browse All Applications',
  ctaHref = '/apps',
}) => {
  return (
    <div className="glass-panel p-10 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center my-8 space-y-4 max-w-lg mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-surface-200 border border-white/10 flex items-center justify-center text-brand-cyan shadow-glow-cyan">
        <PackageSearch className="w-10 h-10" />
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-xs text-text-muted leading-relaxed max-w-sm">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {onReset && (
          <button
            onClick={onReset}
            className="px-5 py-2.5 rounded-xl bg-surface-200 hover:bg-surface-100 border border-white/10 text-white font-bold text-xs transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-brand-cyan" />
            <span>Reset Filters</span>
          </button>
        )}

        {ctaHref && (
          <Link
            href={ctaHref}
            className="px-5 py-2.5 rounded-xl bg-brand-cyan text-slate-950 font-bold text-xs hover:bg-brand-cyan/90 transition-colors"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </div>
  );
};
