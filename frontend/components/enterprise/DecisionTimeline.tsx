import React from 'react';
import { Activity, CheckCircle2 } from 'lucide-react';

export const DecisionTimeline: React.FC = () => {
  const decisions = [
    { time: '15 min ago', decider: 'AI Decision Engine', outcome: 'APPROVE_AUTOMATED_RELEASE', confidence: '98.0%', rationale: 'Passed 28 OWASP security controls & 0 TypeScript errors.' },
    { time: '1 hr ago', decider: 'AI Finance Analyst Felix', outcome: 'MATCH_INVOICE_LEDGER_POST', confidence: '99.5%', rationale: 'Verified line item hashes match purchase order #9021.' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Decision Intelligence Timeline</h3>
      <div className="space-y-4">
        {decisions.map((d, index) => (
          <div key={index} className="p-4 rounded-2xl bg-surface-100 border border-white/10 space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {d.outcome}
              </span>
              <span className="font-mono text-brand-cyan text-[10px]">Confidence: {d.confidence}</span>
            </div>
            <p className="text-text-secondary mt-1">{d.rationale}</p>
            <span className="text-[10px] text-text-muted">{d.decider} • {d.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
