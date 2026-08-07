import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Analytics Dashboard & OLAP Reporting</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="font-semibold text-white mb-4">Daily Ingestion Rate (GB/day)</h3>
        <div className="h-40 bg-slate-900/60 rounded-lg flex items-end justify-between p-6">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
            <div key={d} className="flex flex-col items-center gap-2">
              <div className="w-12 bg-emerald-500 rounded-t" style={{ height: `${(i + 4) * 15}px` }}></div>
              <span className="text-xs text-slate-400">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
