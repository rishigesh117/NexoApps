import React, { useEffect, useState } from 'react';
import { GitBranch, Play, Plus, CheckCircle2 } from 'lucide-react';
import { getEnterpriseWorkflows } from '../../services/enterpriseService';
import { EnterpriseWorkflow as WorkflowType } from '../../../shared/types';

export const EnterpriseWorkflowCenter: React.FC = () => {
  const [workflows, setWorkflows] = useState<WorkflowType[]>([]);

  useEffect(() => {
    getEnterpriseWorkflows().then(setWorkflows);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-brand-cyan" /> Enterprise Workflow Center
          </h2>
          <p className="text-text-muted text-sm">Cross-platform workflow orchestrations and process automation</p>
        </div>
        <button className="px-4 py-2 bg-brand-cyan text-background font-semibold rounded-xl text-sm hover:opacity-90 transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Workflow
        </button>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {workflows.map((wf) => (
          <div key={wf.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm">{wf.workflowName}</h4>
              <p className="text-text-muted text-xs">{wf.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active
              </span>
              <button className="p-2 bg-brand-cyan text-background rounded-lg hover:opacity-90 transition">
                <Play className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
