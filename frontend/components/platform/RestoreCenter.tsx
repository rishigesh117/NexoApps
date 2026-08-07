import React from 'react';
import { RotateCcw } from 'lucide-react';

export const RestoreCenter: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Point-in-Time Restore Engine</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-xl">
        <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
          <RotateCcw className="w-5 h-5 text-purple-400" /> One-Click System Restoration
        </h3>
        <p className="text-xs text-slate-400">Zero data loss point-in-time state recovery for enterprise disaster scenarios.</p>
      </div>
    </div>
  );
};
