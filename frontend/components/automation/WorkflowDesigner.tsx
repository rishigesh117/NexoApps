import React, { useState } from 'react';
import { WorkflowCanvas } from './WorkflowCanvas';

export const WorkflowDesigner: React.FC = () => {
  const [workflowName, setWorkflowName] = useState('Invoice Processing Pipeline');
  const [executionMode, setExecutionMode] = useState('sequential');

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-950 text-slate-100">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white px-3 py-1.5 rounded-lg text-lg font-bold focus:outline-none focus:border-indigo-500"
          />
          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full font-semibold border border-emerald-500/30">
            v8.3 Draft
          </span>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={executionMode}
            onChange={(e) => setExecutionMode(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs px-3 py-2 rounded-lg"
          >
            <option value="sequential">Sequential Execution</option>
            <option value="parallel">Parallel Execution</option>
          </select>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-lg">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-lg">
            Publish Workflow
          </button>
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="flex-1 relative overflow-hidden">
        <WorkflowCanvas />
      </div>
    </div>
  );
};
