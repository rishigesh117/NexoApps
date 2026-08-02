import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Command, Search, Sparkles, X } from 'lucide-react';

interface CommandItem {
  id: string;
  name: string;
  shortcut: string;
  url: string;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const commands: CommandItem[] = [
    { id: '1', name: 'Open AI Builder Studio', shortcut: 'Ctrl+B', url: '/builder' },
    { id: '2', name: 'Launch Autonomous Agents Console', shortcut: 'Ctrl+A', url: '/agents' },
    { id: '3', name: 'Open AI Model Registry & Telemetry', shortcut: 'Ctrl+P', url: '/ai-platform' },
    { id: '4', name: 'Browse AI Marketplace Storefront', shortcut: 'Ctrl+M', url: '/marketplace' },
    { id: '5', name: 'View System Health & Cluster Status', shortcut: 'Ctrl+H', url: '/platform/health' },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const filtered = commands.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 p-4">
      <div className="w-full max-w-xl glass-panel p-4 rounded-3xl border border-white/20 shadow-2xl space-y-4 text-left animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 flex-1">
            <Command className="w-5 h-5 text-brand-cyan" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search platform (Press Esc to close)..."
              className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-text-muted"
            />
          </div>
          <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1 max-h-60 overflow-y-auto scrollbar-none">
          {filtered.map((cmd) => (
            <button
              key={cmd.id}
              onClick={() => {
                setIsOpen(false);
                router.push(cmd.url);
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-xs hover:bg-white/10 text-text-secondary hover:text-white transition-all"
            >
              <span className="flex items-center gap-2 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-brand-cyan" /> {cmd.name}
              </span>
              <span className="px-2 py-0.5 rounded-md font-mono text-[10px] bg-white/10 text-brand-cyan">
                {cmd.shortcut}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
