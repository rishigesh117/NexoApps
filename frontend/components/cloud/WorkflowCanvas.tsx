import React from 'react';
import { WorkflowNode } from './WorkflowNode';
import { Plus } from 'lucide-react';

export const WorkflowCanvas: React.FC = () => {
  const steps = [
    { key: 'step_trigger', name: 'GitHub Webhook Trigger', type: 'trigger', status: 'ready', x: 40, y: 50 },
    { key: 'step_build', name: 'Build Model Artifact', type: 'action', status: 'ready', x: 260, y: 50 },
    { key: 'step_test', name: 'Validate Accuracy Benchmark', type: 'condition', status: 'ready', x: 480, y: 50 },
    { key: 'step_deploy', name: 'Deploy to K8s Cluster', type: 'action', status: 'ready', x: 700, y: 50 },
  ];

  return (
    <div className="relative w-full h-[400px] bg-surface-100/50 rounded-2xl border border-white/10 p-6 overflow-x-auto scrollbar-none flex items-center gap-6">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="flex items-center gap-8 relative z-10">
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <WorkflowNode node={step} />
            {index < steps.length - 1 && (
              <div className="flex items-center gap-1 text-brand-cyan">
                <div className="w-12 h-0.5 bg-gradient-to-r from-brand-cyan to-brand-blue" />
                <span className="text-xs font-bold">→</span>
              </div>
            )}
          </React.Fragment>
        ))}

        <button className="w-12 h-12 rounded-2xl bg-surface-100 hover:bg-white/5 border border-dashed border-white/20 hover:border-brand-cyan text-text-muted hover:text-brand-cyan flex items-center justify-center transition-all shrink-0">
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
