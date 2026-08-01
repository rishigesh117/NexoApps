import { useState, useMemo } from 'react';
import { AppItem, AppCategory } from '../types';

export function useAppFilter(apps: AppItem[]) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchCategory = selectedCategory === 'All' || app.category === selectedCategory;
      const matchPlatform = selectedPlatform === 'All' || app.platform.includes(selectedPlatform as any);
      return matchCategory && matchPlatform;
    });
  }, [apps, selectedCategory, selectedPlatform]);

  return {
    selectedCategory,
    setSelectedCategory,
    selectedPlatform,
    setSelectedPlatform,
    filteredApps,
  };
}
