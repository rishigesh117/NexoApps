import React from 'react';
import { TrendingUp } from 'lucide-react';

export const PerformanceAnalytics: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">AI Model Performance & Evaluation Analytics</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-xl">
        <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" /> Overall Model Accuracy Score
        </h3>
        <div className="text-4xl font-extrabold text-emerald-400 mt-1 mb-2">98.4% Accuracy</div>
        <p className="text-xs text-slate-400">Evaluated on 1,200,000 production inference samples.</p>
      </div>
    </div>
  );
};
