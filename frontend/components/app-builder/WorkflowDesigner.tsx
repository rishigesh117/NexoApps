import React, { useState, useEffect } from 'react';
import { Layers, Plus, Play, Sparkles, Check, ArrowRight } from 'lucide-react';
import { visualEditorService } from '../../services/visualEditorService';

interface WorkflowDesignerProps {
  applicationId?: string;
}

export const WorkflowDesigner: React.FC<WorkflowDesignerProps> = ({ applicationId = 'app-demo-1' }) => {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkflows();
  }, [applicationId]);

  const fetchWorkflows = async () => {
    setLoading(true);
    try {
      const res = await visualEditorService.listWorkflows(applicationId);
      if (res.success) {
        setWorkflows(res.data);
      }
    } catch (err) {
      console.error('Failed to load workflows', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-cyan" />
            Visual Node-Based Workflow Designer
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Connect AI trigger events, vector database searches, model completion nodes, and notification actions.
          </p>
        </div>
        <button
          onClick={fetchWorkflows}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white text-xs font-semibold shadow-glow-cyan hover:opacity-95 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Workflow</span>
        </button>
      </div>

      <div className="space-y-4">
        {workflows.map((wf) => (
          <div key={wf.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">{wf.name}</h3>
                <p className="text-xs text-text-muted mt-0.5">Trigger: {wf.triggerType}</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                Active Node Graph
              </span>
            </div>

            {/* Visual Node Flow Visualizer */}
            <div className="flex items-center gap-3 overflow-x-auto py-4 scrollbar-none">
              {wf.workflowNodes && wf.workflowNodes.map((node: any, index: number) => (
                <React.Fragment key={node.id}>
                  <div className="p-4 rounded-2xl bg-surface-100 border border-white/10 min-w-[200px] shrink-0 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan">{node.type}</span>
                    <h4 className="text-xs font-bold text-white">{node.label}</h4>
                  </div>
                  {index < wf.workflowNodes.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-text-muted shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
