import React, { useState } from 'react';
import { FAQItem } from '../../types';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQCardProps {
  faq: FAQItem;
}

export const FAQCard: React.FC<FAQCardProps> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-all text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between gap-4 text-left hover:bg-white/5 transition-all"
      >
        <div className="flex items-center gap-3">
          <HelpCircle className="w-5 h-5 text-brand-cyan shrink-0" />
          <span className="font-bold text-white text-xs sm:text-sm">{faq.question}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${isOpen ? 'rotate-180 text-brand-cyan' : ''}`} />
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-1 text-xs text-text-secondary leading-relaxed border-t border-white/5 bg-white/5 space-y-2">
          <p>{faq.answer}</p>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-brand-cyan">
            Category: {faq.category}
          </span>
        </div>
      )}
    </div>
  );
};
