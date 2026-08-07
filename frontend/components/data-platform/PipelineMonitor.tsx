import React from 'react';
import { Activity, CheckCircle } from 'lucide-react';

export const PipelineMonitor: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Real-Time Pipeline Execution Monitor</h2>
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/60 text-slate-400 font-semibold uppercase text-xs">
            <tr>
              <th className="p-4">Run ID</th>
              <th className="p-4">Records Processed</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            <tr>
              <td className="p-4 font-mono text-cyan-400">run-1001</td>
              <td className="p-4">125,000 Records</td>
              <td className="p-4">3,420 ms</td>
              <td className="p-4"><span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded font-semibold uppercase">Completed</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
