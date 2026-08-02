import React from 'react';
import { Database, Lock, Key } from 'lucide-react';

export const AgentMemoryViewer: React.FC = () => {
  const memories = [
    { key: 'PROJECT_ARCHITECTURE_SPEC', value: '{"framework":"Next.js 14","backend":"Express","version":"5.0.0"}', type: 'architecture', access: 'read_write' },
    { key: 'CI_CD_K8S_CONFIG', value: '{"cluster":"nexo-prod-us-east-1","namespace":"production"}', type: 'config', access: 'read_only' },
    { key: 'RECENT_CODE_REVIEW_FINDINGS', value: '{"openIssues":0,"testCoverage":"98.5%"}', type: 'audit', access: 'read_write' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Persistent Agent Shared Memory</h3>
          <p className="text-xs text-text-muted">Shared context, workspace knowledge graph, and vector memory</p>
        </div>
      </div>

      <div className="space-y-3">
        {memories.map((m) => (
          <div key={m.key} className="p-4 rounded-2xl bg-surface-100 border border-white/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-brand-cyan" /> {m.key}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white/10 text-brand-cyan text-[10px] font-bold uppercase">{m.type}</span>
            </div>
            <p className="font-mono text-[11px] text-text-secondary bg-background/50 p-2.5 rounded-xl border border-white/5 truncate">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
