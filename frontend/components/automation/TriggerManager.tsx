import React, { useState } from 'react';

export const TriggerManager: React.FC = () => {
  const [triggers] = useState([
    { id: 'trig-1', name: 'Salesforce Invoice Webhook', type: 'webhook', pattern: 'crm.invoice.received', status: 'active' },
    { id: 'trig-2', name: 'Daily Midnight Reconciliation', type: 'schedule', pattern: '0 0 * * *', status: 'active' },
    { id: 'trig-3', name: 'High Memory Telemetry Event', type: 'event_bus', pattern: 'system.telemetry.high_mem', status: 'active' },
  ]);

  return (
    <div className="p-6 space-y-6 text-slate-100">
      <div className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white">Event Triggers &amp; Subscriptions</h2>
          <p className="text-slate-400 text-sm">Configure incoming webhooks, cron schedules, and event bus handlers</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg">
          + Create Trigger
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {triggers.map((trig) => (
          <div key={trig.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">{trig.type}</span>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">{trig.status}</span>
            </div>
            <h3 className="font-bold text-white text-base mb-1">{trig.name}</h3>
            <p className="text-slate-400 text-xs font-mono mb-4">{trig.pattern}</p>
            <button className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded-lg">
              Edit Config &rarr;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
