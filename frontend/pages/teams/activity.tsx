import React from 'react';
import { Activity } from 'lucide-react';

export default function TeamsActivityPage() {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Real-Time Team Engineering Audit Activity</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-xl">
        <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" /> Recent Git & CI Activity
        </h3>
        <p className="text-xs font-mono text-slate-300">user-admin pushed branch feature/v8.1-release to nexoapps-platform-core</p>
      </div>
    </div>
  );
}
