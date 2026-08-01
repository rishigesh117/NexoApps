import React from 'react';
import { cn } from '../../utils/cn';

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  icon,
  size = 'md',
  className,
  disabled,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-xs sm:text-sm',
    lg: 'px-8 py-4 text-sm font-bold',
  };

  return (
    <button
      disabled={disabled}
      className={cn(
        'rounded-full bg-surface-100/90 border border-white/10 hover:border-brand-cyan/40 text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-200 active:scale-95',
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
      {icon && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
