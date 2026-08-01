import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  label = 'Loading platform content...',
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div role="status" className="flex flex-col items-center justify-center py-12 space-y-3">
      <Loader2 className={`${iconSizes[size]} text-brand-cyan animate-spin`} />
      {label && <span className="text-xs font-semibold text-text-muted">{label}</span>}
      <span className="sr-only">Loading...</span>
    </div>
  );
};
