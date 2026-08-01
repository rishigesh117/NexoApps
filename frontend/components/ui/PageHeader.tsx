import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  backHref = '/',
  backLabel = 'Back to Home',
}) => {
  return (
    <div className="pt-8 pb-10 border-b border-white/10 space-y-4 mb-10">
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-xs font-semibold text-brand-cyan hover:underline focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md"
        >
          <ArrowLeft className="w-4 h-4" /> {backLabel}
        </Link>
      )}
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-base text-text-secondary mt-2 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
