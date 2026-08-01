import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-2 pl-2">
      <div className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
        <Bot className="w-3.5 h-3.5 text-brand-cyan" />
      </div>
      <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-white/10 border border-white/10">
        <span
          className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce"
          style={{ animationDelay: '0ms' }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce"
          style={{ animationDelay: '150ms' }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce"
          style={{ animationDelay: '300ms' }}
        />
      </div>
    </div>
  );
};
