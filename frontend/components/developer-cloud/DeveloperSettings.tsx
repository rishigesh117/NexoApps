import React from 'react';
import { Settings, Save } from 'lucide-react';

export const DeveloperSettings: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Developer Cloud Settings & Token Management</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-xl">
        <h3 className="font-semibold text-white mb-2">Personal Access Tokens & SSH Keys</h3>
        <p className="text-xs text-slate-400 mb-4">Manage credentials for git push, Docker logins, and CLI tools.</p>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded text-sm font-semibold flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Preferences
        </button>
      </div>
    </div>
  );
};
