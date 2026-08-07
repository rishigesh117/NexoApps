import React from 'react';
import { TrendingUp, BarChart3, PieChart } from 'lucide-react';

export const RevenueAnalytics: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Revenue Analytics & Financial Metrics</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-white">Monthly Revenue Breakdown</h3>
          <span className="text-xs text-emerald-400 font-semibold">+18.4% YoY</span>
        </div>
        <div className="h-48 bg-slate-900/60 rounded-lg flex items-end justify-between p-6">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => (
            <div key={m} className="flex flex-col items-center gap-2">
              <div className="w-12 bg-blue-600 rounded-t" style={{ height: `${(i + 3) * 20}px` }}></div>
              <span className="text-xs text-slate-400">{m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
