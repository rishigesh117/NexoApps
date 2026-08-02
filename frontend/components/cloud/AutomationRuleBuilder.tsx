import React from 'react';
import { Zap, Plus, Play, ToggleLeft, ToggleRight } from 'lucide-react';

export const AutomationRuleBuilder: React.FC = () => {
  const rules = [
    { id: '1', name: 'Auto-Scale AI Inference Workers', eventPattern: 'queue.backlog_exceeded', actionTarget: 'cluster.scale_up', status: 'active' },
    { id: '2', name: 'Failed Job Webhook Alert', eventPattern: 'deployment.failed', actionTarget: 'webhook.alert', status: 'active' },
    { id: '3', name: 'Nightly Database Backup', eventPattern: 'cron.daily_midnight', actionTarget: 'backup.full_snapshot', status: 'active' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Event-Driven Automation Rules</h3>
          <p className="text-xs text-text-muted">Define trigger events, condition patterns, and automated action targets</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white text-xs font-bold shadow-glow-cyan hover:opacity-95 transition-all">
          <Plus className="w-3.5 h-3.5" /> Create Rule
        </button>
      </div>

      <div className="space-y-3">
        {rules.map((rule) => (
          <div key={rule.id} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-cyan/20 text-brand-cyan flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{rule.name}</h4>
                <p className="text-[10px] text-text-muted font-mono mt-0.5">ON {rule.eventPattern} → THEN {rule.actionTarget}</p>
              </div>
            </div>
            <button className="text-emerald-400 hover:text-emerald-300">
              <ToggleRight className="w-6 h-6" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
