import React from 'react';
import { Terminal, Play, CheckCircle2, Cpu } from 'lucide-react';

export const AgentExecutionConsole: React.FC = () => {
  const executions = [
    { id: 'exec-101', agent: 'Architect Agent Alpha', task: 'Automated Code Review PR #104', status: 'completed', latency: '1.4s' },
    { id: 'exec-100', agent: 'QA Test Automation Gamma', task: 'OWASP Security Verification Audit', status: 'completed', latency: '2.8s' },
    { id: 'exec-099', agent: 'DevOps Orchestrator Beta', task: 'K8s Cluster Rolling Release Deployment', status: 'completed', latency: '4.1s' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Agent Execution Console</h3>
          <p className="text-xs text-text-muted">Real-time autonomous task execution stream and payload logs</p>
        </div>
      </div>

      <div className="space-y-3">
        {executions.map((e) => (
          <div key={e.id} className="p-3.5 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="font-mono font-bold text-white">{e.task}</span>
                <p className="text-[10px] text-text-muted">Agent: {e.agent} ({e.id})</p>
              </div>
            </div>
            <span className="font-mono text-text-muted">{e.latency}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
