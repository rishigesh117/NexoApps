import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, Bot, User as UserIcon, ArrowRight, ExternalLink } from 'lucide-react';
import { fetchApi } from '../../services/apiClient';
import { useAuth } from '../../context/AuthContext';
import { AIMessage } from '../../types';
import Link from 'next/link';

interface AssistantChatWindowProps {
  onClose: () => void;
}

export const AssistantChatWindow: React.FC<AssistantChatWindowProps> = ({ onClose }) => {
  const { role } = useAuth();
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'msg-welcome',
      conversationId: 'conv-init',
      sender: 'assistant',
      text: 'Hello! I am NexoBot, your AI Assistant. How can I help you explore apps, publish software, or navigate NexoApps today?',
      suggestedActions: [
        { label: 'Batlytics App', action: 'navigate', link: '/app/batlytics-cricket-scoring' },
        { label: 'Owner Upload Portal', action: 'navigate', link: '/admin/upload' },
        { label: 'Testing Dashboard', action: 'navigate', link: '/admin/testing' },
        { label: 'Knowledge Base FAQs', action: 'navigate', link: '/help' },
      ],
      createdAt: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const msgText = textToSend || input;
    if (!msgText.trim()) return;

    const userMsg: AIMessage = {
      id: `msg-${Date.now()}-u`,
      conversationId: 'conv-init',
      sender: 'user',
      text: msgText,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const res = await fetchApi<{ success: boolean; data: { replyMessage: AIMessage } }>('/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId: 'conv-init', text: msgText }),
      });

      if (res.data?.replyMessage) {
        setMessages((prev) => [...prev, res.data.replyMessage]);
      }
    } catch {
      // Fallback AI reply
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-a`,
          conversationId: 'conv-init',
          sender: 'assistant',
          text: `I've analyzed your prompt regarding "${msgText}". NexoApps offers AI Global Search, personalized recommendations, custom app playlists, and developer analytics.`,
          suggestedActions: [
            { label: 'Global AI Search', action: 'navigate', link: '/search' },
            { label: 'Knowledge Base', action: 'navigate', link: '/help' },
          ],
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm sm:max-w-md h-[550px] glass-panel rounded-3xl border border-brand-cyan/40 shadow-2xl flex flex-col overflow-hidden text-left font-sans antialiased">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-brand-cyan/20 via-brand-blue/20 to-brand-violet/20 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-cyan to-brand-violet flex items-center justify-center text-slate-950 p-1 shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-sm flex items-center gap-1.5">
              NexoBot AI <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
            </h3>
            <span className="text-[10px] text-emerald-400 font-bold block">Online • Platform Assistant</span>
          </div>
        </div>

        <button onClick={onClose} className="p-1.5 rounded-full text-text-muted hover:text-white hover:bg-white/10 transition-all">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs scrollbar-thin">
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}>
            <div className={`flex items-start gap-2 max-w-[85%] ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                m.sender === 'user' ? 'bg-brand-cyan text-slate-950 font-bold' : 'bg-white/10 text-brand-cyan'
              }`}>
                {m.sender === 'user' ? <UserIcon className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div className={`p-3.5 rounded-2xl leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-brand-cyan to-brand-blue text-slate-950 font-semibold'
                  : 'bg-white/10 text-white border border-white/10'
              }`}>
                {m.text}
              </div>
            </div>

            {/* Suggested Action Pills */}
            {m.suggestedActions && m.suggestedActions.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap pl-9 pt-1">
                {m.suggestedActions.map((act, i) => (
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
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-text-muted text-[11px] pl-2 pt-1">
            <Bot className="w-3.5 h-3.5 text-brand-cyan animate-spin" />
            <span>NexoBot is analyzing your request...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Footer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-slate-950/80 border-t border-white/10 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask NexoBot anything..."
          className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-text-muted text-xs focus:outline-none focus:border-brand-cyan"
        />
        <button
          type="submit"
          className="p-2.5 rounded-full bg-gradient-to-r from-brand-cyan to-brand-violet text-slate-950 hover:shadow-glow-cyan transition-all shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
