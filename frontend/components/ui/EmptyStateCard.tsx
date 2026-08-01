import React from 'react';
import { PackageOpen } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';

interface EmptyStateCardProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  title = 'No Items Found',
  description = 'There are no applications or records matching your selected filter.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 text-center max-w-md mx-auto my-8 space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-surface-200 border border-white/10 flex items-center justify-center mx-auto text-brand-cyan">
        <PackageOpen className="w-7 h-7" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-xs text-text-muted leading-relaxed">{description}</p>
      </div>
      {actionLabel && onAction && (
        <div className="pt-2">
          <PrimaryButton size="sm" onClick={onAction}>
            {actionLabel}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};
