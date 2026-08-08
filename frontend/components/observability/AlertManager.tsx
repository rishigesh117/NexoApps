import React, { useEffect, useState } from 'react';
import { AlertTriangle, ShieldCheck, CheckCircle2, Sliders, Bell } from 'lucide-react';
import { alertingService } from '../../services/alertingService';
import { AlertRule, AlertEvent } from '../../../shared/types';

export const AlertManager: React.FC = () => {
  const [rules, setRules] = useState<AlertRule[]>([]);
  const [events, setEvents] = useState<AlertEvent[]>([]);

  useEffect(() => {
    Promise.all([alertingService.getRules(), alertingService.getEvents()]).then(([r, e]) => {
      setRules(r);
      setEvents(e);
    });
  }, []);

  const handleAcknowledge = async (id: string) => {
    await alertingService.acknowledgeEvent(id);
    setEvents(events.map((evt) => (evt.id === id ? { ...evt, status: 'acknowledged' } : evt)));
  };

  const handleResolve = async (id: string) => {
    await alertingService.resolveEvent(id);
    setEvents(events.map((evt) => (evt.id === id ? { ...evt, status: 'resolved' } : evt)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-brand-cyan" /> Alert Center & Rule Policy Engine
        </h2>
        <span className="text-xs text-text-muted">{rules.length} configured alert rules</span>
      </div>

      {/* Active Triggered Alert Events */}
      <div className="space-y-3">
        <h3 className="text-xs uppercase font-semibold text-text-muted">Triggered Alert Events</h3>
        {events.length === 0 ? (
          <div className="p-6 rounded-xl glass-panel text-center text-xs text-text-muted">No active alert triggers</div>
        ) : (
          events.map((evt) => (
            <div key={evt.id} className="p-4 rounded-xl glass-panel border border-rose-500/30 bg-rose-500/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> {evt.severity} Alert
                </span>
                <span className="text-[11px] text-text-muted">Triggered {new Date(evt.triggeredAt).toLocaleTimeString()}</span>
              </div>
              <h4 className="font-bold text-white text-sm">{evt.title}</h4>
              <p className="text-xs text-text-muted">{evt.message}</p>
              <div className="flex items-center gap-2 pt-2">
                {evt.status === 'triggered' && (
                  <button
                    onClick={() => handleAcknowledge(evt.id)}
                    className="px-3 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold"
                  >
                    Acknowledge
                  </button>
                )}
                {evt.status !== 'resolved' && (
                  <button
                    onClick={() => handleResolve(evt.id)}
                    className="px-3 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Alert Rules List */}
      <div className="p-6 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-4">
        <h3 className="text-base font-bold text-white font-display">Configured Alert Rules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rules.map((rule) => (
            <div key={rule.id} className="p-4 rounded-lg bg-black/20 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-brand-cyan">{rule.severity}</span>
                <span className="text-[10px] text-text-muted">Cooldown: {rule.cooldownMinutes}m</span>
              </div>
              <h4 className="font-semibold text-white text-sm">{rule.name}</h4>
              <div className="text-xs text-text-muted">Rule status: <span className="text-emerald-400 font-semibold">Enabled</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
