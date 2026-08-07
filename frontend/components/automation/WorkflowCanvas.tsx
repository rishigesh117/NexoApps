import React, { useState } from 'react';

interface StepNode {
  id: string;
  name: string;
  type: 'trigger' | 'action' | 'condition' | 'rpa' | 'approval';
  status?: 'ready' | 'running' | 'completed';
}

export const WorkflowCanvas: React.FC = () => {
  const [nodes] = useState<StepNode[]>([
    { id: '1', name: 'Webhook Event: Invoice Received', type: 'trigger', status: 'completed' },
    { id: '2', name: 'RPA OCR Extractor Bot', type: 'rpa', status: 'completed' },
    { id: '3', name: 'Business Rule: Threshold Check', type: 'condition', status: 'completed' },
    { id: '4', name: 'Tier-1 Manager Signoff', type: 'approval', status: 'ready' },
    { id: '5', name: 'SAP S/4HANA Ledger Post', type: 'action', status: 'ready' },
  ]);

  const getNodeColor = (type: StepNode['type']) => {
    switch (type) {
      case 'trigger': return 'from-blue-600 to-indigo-700 border-blue-500';
      case 'rpa': return 'from-purple-600 to-pink-700 border-purple-500';
      case 'condition': return 'from-amber-600 to-orange-700 border-amber-500';
      case 'approval': return 'from-teal-600 to-emerald-700 border-teal-500';
      case 'action': return 'from-indigo-600 to-cyan-700 border-indigo-500';
    }
  };

  return (
    <div className="w-full h-full bg-slate-950 p-8 flex flex-col items-center justify-center relative overflow-auto">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Nodes Stack */}
      <div className="flex flex-col items-center gap-6 z-10">
        {nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <div
              className={`w-80 p-4 rounded-xl bg-gradient-to-r ${getNodeColor(node.type)} border shadow-xl text-white transform hover:scale-105 transition-all duration-200 cursor-pointer`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-white/80">{node.type}</span>
                <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded font-mono">Step {index + 1}</span>
              </div>
              <div className="font-bold text-sm">{node.name}</div>
            </div>

            {index < nodes.length - 1 && (
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-6 bg-indigo-500/50" />
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
