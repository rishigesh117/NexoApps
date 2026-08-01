import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { SecondaryButton } from './SecondaryButton';

interface ErrorCardProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({
  title = 'Something Went Wrong',
  message = 'An unexpected error occurred while loading this section. Please try again.',
  onRetry,
}) => {
  return (
    <div className="glass-card rounded-3xl p-8 border border-red-500/20 bg-red-500/5 text-center max-w-md mx-auto my-8 space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-white">{title}</h3>
        <p className="text-xs text-text-secondary leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <div className="pt-2">
          <SecondaryButton size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />} onClick={onRetry}>
            Retry Loading
          </SecondaryButton>
        </div>
      )}
    </div>
  );
};
