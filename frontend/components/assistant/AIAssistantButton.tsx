import React, { useState } from 'react';
import { Sparkles, MessageSquare } from 'lucide-react';
import { AssistantChatWindow } from './AssistantChatWindow';

export const AIAssistantButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 rounded-full text-slate-950 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet hover:shadow-glow-cyan transition-all transform hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center relative group"
          title="Open NexoBot AI Assistant"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
        </button>
      </div>

      {/* Assistant Modal Window */}
      {isOpen && <AssistantChatWindow onClose={() => setIsOpen(false)} />}
    </>
  );
};
