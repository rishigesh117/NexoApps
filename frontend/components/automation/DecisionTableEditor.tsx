import React from 'react';

export const DecisionTableEditor: React.FC = () => {
  return (
    <div className="p-6 space-y-6 text-slate-100">
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Decision Table Editor</h2>
          <p className="text-slate-400 text-sm">DMN-standard decision matrix modeling with multi-hit policy evaluation</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl">
          + Add Decision Table
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-4">Credit Risk Scoring Matrix (Hit Policy: First)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800">
            <thead className="bg-slate-950 text-slate-300">
              <tr>
                <th className="p-3 border-b border-r border-slate-800 bg-blue-950/40 text-blue-300">Input: Credit Score</th>
                <th className="p-3 border-b border-r border-slate-800 bg-blue-950/40 text-blue-300">Input: Annual Income</th>
                <th className="p-3 border-b border-r border-slate-800 bg-purple-950/40 text-purple-300">Output: Risk Level</th>
                <th className="p-3 border-b border-slate-800 bg-purple-950/40 text-purple-300">Output: Max Line ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="p-3 border-r border-slate-800 font-mono">&gt; 750</td>
                <td className="p-3 border-r border-slate-800 font-mono">&gt; 80,000</td>
                <td className="p-3 border-r border-slate-800 text-emerald-400 font-bold">LOW</td>
                <td className="p-3 font-mono">50,000</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-slate-800 font-mono">650 - 749</td>
                <td className="p-3 border-r border-slate-800 font-mono">&gt; 50,000</td>
                <td className="p-3 border-r border-slate-800 text-amber-400 font-bold">MEDIUM</td>
                <td className="p-3 font-mono">20,000</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-slate-800 font-mono">&lt; 650</td>
                <td className="p-3 border-r border-slate-800 font-mono">Any</td>
                <td className="p-3 border-r border-slate-800 text-rose-400 font-bold">HIGH</td>
                <td className="p-3 font-mono">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
