import React from 'react';

export const AutomationSettings: React.FC = () => {
  return (
    <div className="p-6 space-y-6 text-slate-100 max-w-4xl">
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white">Automation Engine Settings</h2>
        <p className="text-slate-400 text-sm">Configure runtime thresholds, default retries, and security policies</p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div>
          <label className="block text-sm font-bold text-white mb-1">Max Concurrent Executions</label>
          <input type="number" defaultValue={50} className="w-full bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-white text-sm" />
        </div>

        <div>
          <label className="block text-sm font-bold text-white mb-1">Step Retry Strategy</label>
          <select className="w-full bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-white text-sm">
            <option>Exponential Backoff (Max 3 retries)</option>
            <option>Fixed Delay (5 seconds)</option>
            <option>Fail Fast (No retry)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-white mb-1">Audit Log Retention (Days)</label>
          <input type="number" defaultValue={90} className="w-full bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-white text-sm" />
        </div>

        <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg">
          Save Settings
        </button>
      </div>
    </div>
  );
};
