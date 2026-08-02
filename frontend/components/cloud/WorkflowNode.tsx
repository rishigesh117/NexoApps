import React from 'react';
import { Play, GitBranch, CheckCircle2, AlertCircle } from 'lucide-react';

interface NodeProps {
  node: {
    key: string;
    name: string;
    type: string;
    status: string;
  };
}

export const WorkflowNode: React.FC<NodeProps> = ({ node }) => {
  const typeBadge = (type: string) => {
    if (type === 'trigger') return <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase">Trigger</span>;
    if (type === 'condition') return <span className="px-2 py-0.5 rounded-md bg-violet-500/20 text-violet-300 text-[10px] font-bold uppercase">Condition</span>;
    return <span className="px-2 py-0.5 rounded-md bg-brand-cyan/20 text-brand-cyan text-[10px] font-bold uppercase">Action</span>;
  };

  return (
    <div className="w-48 glass-panel p-4 rounded-2xl border border-white/10 hover:border-brand-cyan/40 transition-all cursor-pointer shadow-lg group shrink-0">
      <div className="flex items-center justify-between mb-2">
        {typeBadge(node.type)}
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      </div>
      <h4 className="text-xs font-bold text-white group-hover:text-brand-cyan transition-colors">{node.name}</h4>
      <p className="text-[10px] text-text-muted mt-1 font-mono">{node.key}</p>
    </div>
  );
};
