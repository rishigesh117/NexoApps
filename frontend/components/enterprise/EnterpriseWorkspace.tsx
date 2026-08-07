import React, { useEffect, useState } from 'react';
import { Building2, Plus, CheckCircle2 } from 'lucide-react';
import { getEnterpriseWorkspaces } from '../../services/enterpriseWorkspaceService';
import { EnterpriseWorkspace as WorkspaceType } from '../../../shared/types';

export const EnterpriseWorkspaceComponent: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([]);

  useEffect(() => {
    getEnterpriseWorkspaces().then(setWorkspaces);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-brand-cyan" /> Enterprise Workspaces Hub
          </h2>
          <p className="text-text-muted text-sm">Unified multi-tenant enterprise digital workplace management</p>
        </div>
        <button className="px-4 py-2 bg-brand-cyan text-background font-semibold rounded-xl text-sm hover:opacity-90 transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Workspace
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workspaces.map((ws) => (
          <div key={ws.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-lg">{ws.workspaceName}</h3>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active
              </span>
            </div>
            <p className="text-text-muted text-xs">{ws.description}</p>
            <div className="text-xs text-brand-cyan font-mono pt-2 border-t border-white/10">
              Slug: /{ws.slug}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
