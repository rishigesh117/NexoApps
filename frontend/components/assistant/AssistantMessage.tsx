import React from 'react';
import { AIMessage } from '../../types';
import { Bot, User as UserIcon, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface AssistantMessageProps {
  message: AIMessage;
  onClose?: () => void;
}

export const AssistantMessage: React.FC<AssistantMessageProps> = ({ message, onClose }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-2`}>
      <div className={`flex items-start gap-2 max-w-[85%] ${isUser ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
          isUser ? 'bg-brand-cyan text-slate-950' : 'bg-white/10 text-brand-cyan'
        }`}>
          {isUser ? <UserIcon className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
        </div>

        {/* Bubble */}
        <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
          isUser
            ? 'bg-gradient-to-r from-brand-cyan to-brand-blue text-slate-950 font-semibold'
            : 'bg-white/10 text-white border border-white/10'
        }`}>
          {message.text}
        </div>
      </div>

      {/* Suggested action pills */}
      {!isUser && message.suggestedActions && message.suggestedActions.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap pl-9 pt-1">
          {message.suggestedActions.map((act, i) => (
            <Link
              key={i}
              href={act.link || '#'}
              onClick={onClose}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-brand-cyan/30 text-brand-cyan text-[10px] font-bold flex items-center gap-1 transition-all"
            >
              <span>{act.label}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
