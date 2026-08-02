import React, { useState } from 'react';
import { MessageSquare, Send, Bot, FileText } from 'lucide-react';

export const KnowledgeChat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([
    { role: 'assistant', text: 'Hello! I am your Enterprise RAG Assistant. Ask me anything about your documents, technical specs, or compliance policies.', citations: [] },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    const userMsg = { role: 'user', text: input };
    const botMsg = {
      role: 'assistant',
      text: `Based on your Enterprise Engineering Knowledge Vault:\n\nPhase 8C implements enterprise-scale Retrieval-Augmented Generation (RAG) with context-synthesized responses and HNSW vector index lookups.`,
      citations: ['NexoApps_v5_Architecture_Spec.pdf (Chunk #101)'],
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6 flex flex-col h-[520px]">
      <div>
        <h3 className="text-lg font-bold text-white">Enterprise RAG Conversational Assistant</h3>
        <p className="text-xs text-text-muted">Context-aware Q&A with live vector document citations</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex gap-3 text-xs ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-violet flex items-center justify-center text-white shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div className={`p-4 rounded-2xl max-w-xl space-y-2 ${m.role === 'user' ? 'bg-brand-cyan/20 border border-brand-cyan/30 text-white' : 'bg-surface-100 border border-white/10 text-text-secondary'}`}>
              <p className="whitespace-pre-line">{m.text}</p>
              {m.citations && m.citations.length > 0 && (
                <div className="pt-2 border-t border-white/10 font-mono text-[10px] text-brand-cyan">
                  Citations: {m.citations.join(', ')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about your knowledge vault..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan"
        />
        <button type="submit" className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white text-xs font-bold shadow-glow-cyan hover:opacity-95 transition-all">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
