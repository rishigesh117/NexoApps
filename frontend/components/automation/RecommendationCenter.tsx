import React from 'react';

export const RecommendationCenter: React.FC = () => {
  const recommendations = [
    {
      title: 'Parallelize Document OCR & ERP Ingestion Steps',
      impact: '9.2 / 10 Impact Score',
      desc: 'Splitting step 2 and step 3 into parallel branches will decrease overall workflow latency by ~35%.',
    },
    {
      title: 'Auto-Approve Low Value Requisitions (< $500)',
      impact: '8.7 / 10 Impact Score',
      desc: 'Creating a decision table rule for auto-approval will eliminate SLA waiting times by ~18 hours per request.',
    },
  ];

  return (
    <div className="p-6 space-y-6 text-slate-100">
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white">AI Process Optimization Recommendations</h2>
        <p className="text-slate-400 text-sm">Autonomous AI recommendations to eliminate bottlenecks and optimize throughput</p>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, i) => (
          <div key={i} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">{rec.impact}</span>
              <h3 className="text-lg font-bold text-white mt-1">{rec.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{rec.desc}</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg">
              Apply Optimization
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
