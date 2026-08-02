import React from 'react';
import { Activity, Clock } from 'lucide-react';

export const AgentTimeline: React.FC = () => {
  const timelineEvents = [
    { time: '10 min ago', actor: 'DevOps Orchestrator Beta', action: 'Approved Kubernetes v5.0 production rollout' },
    { time: '25 min ago', actor: 'QA Test Automation Gamma', action: 'Passed 28 OWASP security controls & unit test suite' },
    { time: '1 hr ago', actor: 'Architect Agent Alpha', action: 'Completed Phase 8A schema & API refactoring review' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Agent Swarm Activity Timeline</h3>
      <div className="space-y-4">
        {timelineEvents.map((ev, index) => (
          <div key={index} className="flex items-start gap-3 text-xs">
            <div className="w-2 h-2 rounded-full bg-brand-cyan mt-1.5 shrink-0 shadow-glow-cyan" />
            <div>
              <p className="font-bold text-white">{ev.actor}</p>
              <p className="text-text-secondary">{ev.action}</p>
              <span className="text-[10px] text-text-muted">{ev.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
