import React, { useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import { softwareProjectService } from '../../services/softwareProjectService';

interface DeveloperAssistantProps {
  projectId?: string;
}

export const DeveloperAssistant: React.FC<DeveloperAssistantProps> = ({ projectId = 'proj-demo-1' }) => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: 'assistant', text: 'Hello! I am your Autonomous AI Pair Programmer Copilot.' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMsg = prompt;
    setPrompt('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await softwareProjectService.askAssistant(projectId, userMsg);
      if (res.success) {
        setMessages(prev => [...prev, { role: 'assistant', text: res.data.response }]);
      }
    } catch (err) {
      console.error('Assistant request failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-white/10">
        <Bot className="w-5 h-5 text-brand-cyan" />
        <h3 className="text-base font-bold text-white">Autonomous AI Pair Programmer Copilot</h3>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto pr-1 text-xs">
        {messages.map((m, i) => (
          <div key={i} className={`p-3 rounded-2xl ${m.role === 'user' ? 'bg-brand-cyan/15 text-white text-right' : 'bg-surface-100 text-text-secondary leading-relaxed'}`}>
            {m.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask copilot architecture or refactoring advice..."
          className="flex-1 px-3.5 py-2 rounded-xl bg-background border border-white/10 text-white text-xs focus:outline-none"
        />
        <button type="submit" disabled={loading} className="px-4 py-2 rounded-xl bg-brand-cyan text-slate-950 font-bold text-xs shadow-glow-cyan">
          Send
        </button>
      </form>
    </div>
  );
};
