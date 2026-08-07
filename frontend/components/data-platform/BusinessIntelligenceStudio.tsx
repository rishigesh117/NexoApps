import React from 'react';
import { PieChart, Sliders } from 'lucide-react';

export const BusinessIntelligenceStudio: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Business Intelligence (BI) Studio</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-xl">
        <h3 className="font-semibold text-white mb-2">Interactive BI Visualizer</h3>
        <p className="text-xs text-slate-400">Custom SQL query builder, drag-and-drop dashboard widgets, and ad-hoc aggregations.</p>
      </div>
    </div>
  );
};
