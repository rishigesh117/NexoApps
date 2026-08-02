import React from 'react';
import { Database, Camera, BrainCircuit } from 'lucide-react';

export const ConversationMemoryPanel: React.FC = () => {
  const memories = [
    { key: 'USER_QUERY_FOCUS', value: 'RAG & Vector Search Architecture', score: 9.2 },
    { key: 'PREFERRED_MODEL', value: 'gemini-1.5-pro', score: 8.5 },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">RAG Conversational Memory Network</h3>
          <p className="text-xs text-text-muted">Intelligent session context retention and state snapshots</p>
        </div>
      </div>

      <div className="space-y-3">
        {memories.map((m) => (
          <div key={m.key} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BrainCircuit className="w-4 h-4 text-brand-cyan" />
              <div>
                <h4 className="font-mono text-xs font-bold text-white">{m.key}</h4>
                <p className="text-[10px] text-text-muted font-mono mt-0.5">{m.value}</p>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-brand-cyan">Score: {m.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
