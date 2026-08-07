import React from 'react';
import { Key, Copy, CheckCircle } from 'lucide-react';

export const LicenseManager: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Digital License Key Manager</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-white">NexoVision Pro AI Vision Model</h3>
          <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold">Active</span>
        </div>
        <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-blue-400 flex justify-between items-center mb-4">
          <span>NXO-PRO-889A-442F-990B-7711</span>
          <button className="text-slate-400 hover:text-white"><Copy className="w-4 h-4" /></button>
        </div>
        <div className="text-xs text-slate-400">Activations: 2 / 5 Devices</div>
      </div>
    </div>
  );
};
