export * from '../../shared/types';

export interface CategoryFilterOption {
  id: string;
  name: string;
  count: number;
  iconName: string;
}

export interface PlatformBadgeProps {
  platform: string;
  size?: 'sm' | 'md' | 'lg';
}
