import React, { useState } from 'react';
import { AIAgent } from '../../types';
import { sendAgentMessage } from '../../services/agentService';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface AgentChatWindowProps {
  agent: AIAgent;
}

export const AgentChatWindow: React.FC<AgentChatWindowProps> = ({ agent }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string }>>([
    { sender: 'agent', text: `Hello! I am ${agent.name} (${agent.role}). How can I assist with your software architecture or code today?` },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const userText = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsSending(true);

    try {
      const session = await sendAgentMessage(agent.id, userText);
      if (session && session.messages) {
        setMessages(session.messages.map((m) => ({ sender: m.sender, text: m.text })));
      }
    } catch {
      setMessages((prev) => [...prev, { sender: 'agent', text: 'Error connecting to agent service.' }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col h-[520px] text-left shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{agent.avatar}</span>
          <div>
            <h3 className="font-extrabold text-white text-base leading-tight">{agent.name}</h3>
            <p className="text-xs text-brand-cyan font-semibold">{agent.role}</p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active Session
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 max-w-[85%] ${
              m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
              m.sender === 'user' ? 'bg-brand-violet/20 text-brand-violet border border-brand-violet/30' : 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30'
            }`}>
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
              m.sender === 'user'
                ? 'bg-gradient-to-r from-brand-cyan/20 to-brand-violet/20 text-white border border-brand-cyan/30'
                : 'bg-white/5 border border-white/10 text-text-secondary'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex items-center gap-2 pt-2 border-t border-white/10">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${agent.name}...`}
          className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
        />
        <button
          type="submit"
          disabled={isSending}
          className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1.5 transition-all shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{isSending ? 'Sending...' : 'Send'}</span>
        </button>
      </form>
    </div>
  );
};
