import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const DataQualityCenter: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Data Quality & Anomaly Detection Center</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-white">Overall Data Quality Score</h3>
          <span className="text-2xl font-extrabold text-emerald-400">99.8% Passed</span>
        </div>
        <div className="space-y-2 text-sm text-slate-300">
          <div className="flex justify-between p-2.5 bg-slate-900 rounded">
            <span>null_check (fact_user_activity.user_id)</span>
            <span className="text-emerald-400 font-bold">100% Passed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
