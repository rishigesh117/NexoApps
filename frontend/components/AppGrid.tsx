import React from 'react';
import { AppItem } from '../types';
import { AppCard } from './AppCard';
import { SkeletonCard } from './store/SkeletonCard';
import { EmptyState } from './store/EmptyState';

interface AppGridProps {
  apps: AppItem[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptySubtitle?: string;
  onResetFilters?: () => void;
}

export const AppGrid: React.FC<AppGridProps> = ({
  apps,
  isLoading = false,
  emptyTitle = 'No Applications Found',
  emptySubtitle = 'Try adjusting your search terms or filter criteria.',
  onResetFilters,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!apps || apps.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        subtitle={emptySubtitle}
        onReset={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {apps.map((app) => (
        <AppCard key={app.id || app.slug} app={app} />
      ))}
    </div>
  );
};
