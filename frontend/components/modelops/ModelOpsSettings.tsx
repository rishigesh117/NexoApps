import React from 'react';
import { Settings, Save } from 'lucide-react';

export const ModelOpsSettings: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">ModelOps & MLOps Platform Configuration</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-xl">
        <h3 className="font-semibold text-white mb-2">Automated Retraining Thresholds</h3>
        <p className="text-xs text-slate-400 mb-4">Set automated trigger rules when drift scores exceed 0.05.</p>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-sm font-semibold flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>
    </div>
  );
};
