import React, { useState, useEffect } from 'react';
import { Layers, Plus, CheckCircle2 } from 'lucide-react';
import { workspaceService } from '../../services/workspaceService';

export const WorkspaceManager: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<any[]>([]);

  useEffect(() => {
    workspaceService.getWorkspaces().then(setWorkspaces);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Centralized Workspace Registry</h2>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Workspace
        </button>
      </div>

      <div className="space-y-4 max-w-4xl">
        {workspaces.map(w => (
          <div key={w.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Layers className="w-6 h-6 text-purple-400" />
              <div>
                <h3 className="font-semibold text-white">{w.workspaceName}</h3>
                <p className="text-xs text-slate-400 font-mono">Owner: {w.ownerId}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold uppercase">Active</span>
          </div>
        ))}
      </div>
    </div>
  );
};
