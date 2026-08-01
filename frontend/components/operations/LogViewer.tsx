import React from 'react';
import { Terminal, CheckCircle2, AlertTriangle } from 'lucide-react';

interface LogViewerProps {
  logs: any[];
}

export const LogViewer: React.FC<LogViewerProps> = ({ logs }) => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-slate-950 font-mono text-xs text-left space-y-3 shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-white text-sm">Real-Time System Log Stream</h3>
        </div>
        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Telemetry
        </span>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto pr-2 scrollbar-thin">
        {logs.map((log) => (
          <div key={log.id} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              log.level === 'INFO' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
            }`}>
              {log.level}
            </span>
            <span className="text-text-muted text-[11px] shrink-0">[{log.service}]</span>
            <span className="text-white flex-1">{log.message}</span>
            <span className="text-text-muted text-[10px] shrink-0">{new Date(log.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
