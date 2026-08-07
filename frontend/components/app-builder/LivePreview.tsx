import React, { useState } from 'react';
import { Play, Bot, Image as ImageIcon, Send, Sparkles } from 'lucide-react';
import { ApplicationComponent } from '../../../shared/types';

interface LivePreviewProps {
  components: ApplicationComponent[];
}

export const LivePreview: React.FC<LivePreviewProps> = ({ components }) => {
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState<{ role: string; text: string }[]>([
    { role: 'assistant', text: 'Hello! I am your live AI Customer Support Copilot.' }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatLog(prev => [
      ...prev,
      { role: 'user', text: chatInput },
      { role: 'assistant', text: `[Live Runtime Preview]: Processed response for "${chatInput}" using configured GPT-4o Gateway.` }
    ]);
    setChatInput('');
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6 min-h-[500px]">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <span className="text-xs font-bold text-white flex items-center gap-2">
          <Play className="w-4 h-4 text-emerald-400" />
          Interactive Application Live Runtime Sandbox
        </span>
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          Sandbox Connected
        </span>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {/* Render Chatbot Block */}
        <div className="p-4 rounded-2xl bg-surface-100 border border-white/10 space-y-3">
          <h4 className="text-xs font-bold text-white flex items-center gap-2">
            <Bot className="w-4 h-4 text-brand-cyan" />
            Support Copilot (Live Preview)
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
            {chatLog.map((m, i) => (
              <div key={i} className={`p-2.5 rounded-xl ${m.role === 'user' ? 'bg-brand-cyan/15 text-white text-right' : 'bg-surface-200 text-text-secondary'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Test copilot response..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-background border border-white/10 text-white text-xs focus:outline-none"
            />
            <button type="submit" className="px-4 py-2 rounded-xl bg-brand-cyan text-slate-950 font-bold text-xs">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
