import React, { useState } from 'react';
import { Cpu, Send, Sparkles } from 'lucide-react';

export const AICommandCenter: React.FC = () => {
  const [command, setCommand] = useState('');
  const [logs, setLogs] = useState<string[]>([
    '[AI OS v7.0 Kernel]: Autonomous orchestration engine initialized.',
    '[AI OS v7.0 Kernel]: Ready for natural language system commands.'
  ]);

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const cmd = command;
    setCommand('');
    setLogs(prev => [...prev, `> ${cmd}`, `[AI OS Agent]: Executing system command "${cmd}" across active modules... Done.`]);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-white/10">
        <Sparkles className="w-5 h-5 text-brand-cyan" />
        <h3 className="text-base font-bold text-white">Central AI Command & Orchestration Terminal</h3>
      </div>

      <div className="p-4 rounded-2xl bg-background/90 border border-white/10 font-mono text-xs text-brand-cyan space-y-1 max-h-48 overflow-y-auto">
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>

      <form onSubmit={handleExecute} className="flex gap-2">
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Issue cross-module command (e.g. 'Deploy fintech microservice to staging')..."
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
        />
        <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-bold text-xs shadow-glow-cyan">
          Execute
        </button>
      </form>
    </div>
  );
};
