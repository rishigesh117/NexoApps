import React, { useEffect, useState } from 'react';
import { Building2, Plus, Users, Shield, CheckCircle } from 'lucide-react';
import { getWorkspaces } from '../../services/workspaceService';

export const WorkspaceManager: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<any[]>([]);

  useEffect(() => {
    getWorkspaces().then(setWorkspaces);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-brand-cyan" /> Workspace Manager
          </h2>
          <p className="text-text-muted text-sm">Manage multi-tenant enterprise workspaces and team memberships</p>
        </div>
        <button className="px-4 py-2 bg-brand-cyan text-background font-semibold rounded-xl text-sm hover:opacity-90 transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Workspace
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workspaces.map((ws) => (
          <div key={ws.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-lg">{ws.workspaceName}</h3>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Active
              </span>
            </div>
            <p className="text-text-muted text-xs">{ws.description || 'Enterprise Workspace'}</p>
            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-text-secondary">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-brand-cyan" /> Members: 12 Active
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-purple-400" /> RBAC Enabled
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
