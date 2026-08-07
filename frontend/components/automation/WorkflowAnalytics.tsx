import React from 'react';

export const WorkflowAnalytics: React.FC = () => {
  return (
    <div className="p-6 space-y-6 text-slate-100">
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white">Process Analytics &amp; ROI Console</h2>
        <p className="text-slate-400 text-sm">Measure efficiency gains, time saved, and operational cost reduction</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 font-bold uppercase">Total Time Saved</span>
          <div className="text-3xl font-bold text-emerald-400 mt-2">14,250 Hours</div>
          <p className="text-slate-500 text-xs mt-1">+18.5% improvement over last quarter</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 font-bold uppercase">Estimated Cost Savings</span>
          <div className="text-3xl font-bold text-indigo-400 mt-2">$712,500 USD</div>
          <p className="text-slate-500 text-xs mt-1">Based on $50/hr average loaded labor rate</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 font-bold uppercase">Overall Efficiency Score</span>
          <div className="text-3xl font-bold text-purple-400 mt-2">96.8 / 100</div>
          <p className="text-slate-500 text-xs mt-1">SLA error margin &lt; 0.6%</p>
        </div>
      </div>
    </div>
  );
};
