import React from 'react';

interface SectionTitleProps {
  pillText?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  pillText,
  title,
  subtitle,
  align = 'left',
}) => {
  return (
    <div className={align === 'center' ? 'text-center max-w-2xl mx-auto space-y-3 mb-10' : 'space-y-2 mb-8'}>
      {pillText && (
        <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wider block">
          {pillText}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
