import React, { useEffect, useState } from 'react';
import { GitBranch, Server, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import { observabilityService } from '../../services/observabilityService';

export const ServiceMap: React.FC = () => {
  const [graph, setGraph] = useState<any>({ nodes: [], edges: [] });
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    observabilityService.getDependencies().then((data) => setGraph(data));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-brand-cyan" /> Service Dependency Topology & Flow Map
          </h2>
          <p className="text-xs text-text-muted">Interactive visual relationship graph of downstream & upstream dependencies</p>
        </div>
      </div>

      <div className="p-6 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {graph.nodes.map((node: any) => (
            <button
              key={node.id}
              onClick={() => setSelectedService(node.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedService === node.id
                  ? 'border-brand-cyan bg-brand-cyan/10 shadow-glow-cyan'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono text-text-muted">{node.type}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase ${
                  node.health === 'healthy' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {node.health}
                </span>
              </div>
              <h3 className="font-bold text-white mt-1">{node.name}</h3>
            </button>
          ))}
        </div>

        {/* Edge Connections List */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Active Dependency Edges</h3>
          <div className="space-y-2">
            {graph.edges.map((edge: any) => (
              <div key={edge.id} className="p-3 rounded-lg bg-black/20 border border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-brand-cyan">{edge.sourceName}</span>
                  <ArrowRight className="w-4 h-4 text-text-muted" />
                  <span className="font-mono text-purple-400">{edge.targetName}</span>
                </div>
                <div className="flex items-center gap-4 text-text-muted">
                  <span className="uppercase text-[10px] bg-white/10 px-2 py-0.5 rounded">{edge.type}</span>
                  <span>Latency: <strong className="text-white">{edge.latencyMs}ms</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
