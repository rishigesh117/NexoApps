import React from 'react';
import { Settings, Save } from 'lucide-react';

export const InfrastructureSettings: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Cloud Infrastructure Configuration</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Default Cloud Provider</label>
          <select className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white">
            <option>Nexo Global Cloud Mesh</option>
            <option>AWS Hybrids</option>
            <option>Azure AI Clusters</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Configuration
        </button>
      </div>
    </div>
  );
};
