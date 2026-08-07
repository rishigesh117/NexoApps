import React, { useState, useEffect } from 'react';
import { GitFork } from 'lucide-react';
import { platformService } from '../../services/platformService';
import { PlatformWorkflow } from '../../../shared/types';

export const WorkflowCenter: React.FC = () => {
  const [workflows, setWorkflows] = useState<PlatformWorkflow[]>([]);

  useEffect(() => {
    platformService.getWorkflows().then(setWorkflows);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Cross-Platform Workflow Orchestration Center</h2>
      <div className="space-y-4 max-w-4xl">
        {workflows.map(w => (
          <div key={w.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <GitFork className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="font-semibold text-white">{w.workflowName}</h3>
                <p className="text-xs text-slate-400 font-mono">{w.stepCount} Steps Configured</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold uppercase">{w.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
