import React from 'react';
import { AIConversation } from '../../types';
import { MessageSquare, Plus, Clock } from 'lucide-react';

interface ConversationSidebarProps {
  conversations: AIConversation[];
  activeId: string;
  onSelect: (id: string) => void;
  onNew: () => void;
}

export const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  conversations,
  activeId,
  onSelect,
  onNew,
}) => {
  return (
    <div className="w-56 shrink-0 flex flex-col gap-3">
      <button
        type="button"
        onClick={onNew}
        className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center justify-center gap-1.5 transition-all"
      >
        <Plus className="w-3.5 h-3.5" />
        New Conversation
      </button>

      <div className="space-y-1">
        {conversations.length === 0 && (
          <p className="text-[11px] text-text-muted px-2 py-4 text-center">No conversations yet.</p>
        )}
        {conversations.map((conv) => (
          <button
            key={conv.id}
            type="button"
            onClick={() => onSelect(conv.id)}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all ${
              activeId === conv.id
                ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40'
                : 'text-text-secondary hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3 h-3 shrink-0" />
              <span className="line-clamp-1 font-semibold">{conv.title}</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5 pl-5 text-[10px] text-text-muted">
              <Clock className="w-2.5 h-2.5" />
              {new Date(conv.createdAt).toLocaleDateString()}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
