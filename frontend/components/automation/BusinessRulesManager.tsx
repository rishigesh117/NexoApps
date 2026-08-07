import React, { useState } from 'react';

export const BusinessRulesManager: React.FC = () => {
  const [rules] = useState([
    { id: 'r-1', name: 'High Value Transaction Rule', group: 'finance', priority: 10, status: 'active' },
    { id: 'r-2', name: 'EU GDPR PII Masking Policy', group: 'compliance', priority: 100, status: 'active' },
    { id: 'r-3', name: 'Auto-Approve Requisitions < $500', group: 'procurement', priority: 5, status: 'active' },
  ]);

  return (
    <div className="p-6 space-y-6 text-slate-100">
      <div className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white">Business Rules Engine</h2>
          <p className="text-slate-400 text-sm">Define declarative business logic, policy constraints, and execution priorities</p>
        </div>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-xl shadow-lg">
          + Add Business Rule
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase text-xs">
            <tr>
              <th className="p-4">Rule Name</th>
              <th className="p-4">Group</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {rules.map((rule) => (
              <tr key={rule.id} className="hover:bg-slate-800/50 transition">
                <td className="p-4 font-semibold text-white">{rule.name}</td>
                <td className="p-4"><span className="bg-slate-800 px-2 py-1 rounded text-xs">{rule.group}</span></td>
                <td className="p-4 font-mono">{rule.priority}</td>
                <td className="p-4"><span className="text-emerald-400 font-medium">{rule.status}</span></td>
                <td className="p-4 text-right">
                  <button className="text-indigo-400 hover:text-indigo-300 font-medium">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
