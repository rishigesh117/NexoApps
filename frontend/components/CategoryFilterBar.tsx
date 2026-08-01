import React from 'react';
import { cn } from '../utils/cn';
import { Smartphone, Cpu, Globe, Monitor, GraduationCap, Rocket, Grid } from 'lucide-react';

interface CategoryFilterBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = [
    { name: 'All', icon: Grid },
    { name: 'Android Apps', icon: Smartphone },
    { name: 'AI Apps', icon: Cpu },
    { name: 'Web Apps', icon: Globe },
    { name: 'Desktop Applications', icon: Monitor },
    { name: 'College Projects', icon: GraduationCap },
    { name: 'Future Products', icon: Rocket },
  ];

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-none">
      <div className="flex items-center gap-2 min-w-max">
        {categories.map((cat) => {
          const IconComp = cat.icon;
          const isSelected = selectedCategory === cat.name;

          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border',
                isSelected
                  ? 'bg-gradient-to-r from-brand-cyan to-brand-blue text-white border-brand-cyan/40 shadow-glow-cyan'
                  : 'bg-surface-100/80 text-text-secondary border-white/5 hover:border-white/20 hover:text-white'
              )}
            >
              <IconComp className={cn('w-4 h-4', isSelected ? 'text-white' : 'text-brand-cyan')} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
