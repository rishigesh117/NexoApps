import React from 'react';
import { Package, Clock } from 'lucide-react';

export const OrderHistory: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">User Order History</h2>
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
        <div className="flex justify-between items-center pb-4 border-b border-slate-700">
          <div>
            <span className="font-mono text-sm text-blue-400">NXO-ORD-2026-001</span>
            <span className="text-xs text-slate-400 block">Aug 06, 2026</span>
          </div>
          <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold">Completed</span>
        </div>
      </div>
    </div>
  );
};
