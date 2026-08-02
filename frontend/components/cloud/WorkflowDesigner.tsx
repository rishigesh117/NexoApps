import React, { useState } from 'react';
import { WorkflowCanvas } from './WorkflowCanvas';
import { WorkflowExecutionPanel } from './WorkflowExecutionPanel';
import { Play, Save, Plus, Layers, Zap } from 'lucide-react';

export const WorkflowDesigner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'canvas' | 'execution'>('canvas');
  const [selectedWorkflow, setSelectedWorkflow] = useState('Prod AI Deployment Workflow');

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-blue flex items-center justify-center text-white">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{selectedWorkflow}</h2>
            <p className="text-xs text-text-muted">Visual drag-and-drop workflow designer & execution engine</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-surface-100 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('canvas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'canvas' ? 'bg-gradient-to-r from-brand-cyan to-brand-blue text-white shadow-glow-cyan' : 'text-text-secondary hover:text-white'
              }`}
            >
              Canvas Designer
            </button>
            <button
              onClick={() => setActiveTab('execution')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'execution' ? 'bg-gradient-to-r from-brand-cyan to-brand-blue text-white shadow-glow-cyan' : 'text-text-secondary hover:text-white'
              }`}
            >
              Execution History
            </button>
          </div>

          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold shadow-glow-cyan hover:opacity-95 transition-all">
            <Play className="w-3.5 h-3.5" /> Execute
          </button>
        </div>
      </div>

      {activeTab === 'canvas' ? <WorkflowCanvas /> : <WorkflowExecutionPanel />}
    </div>
  );
};
