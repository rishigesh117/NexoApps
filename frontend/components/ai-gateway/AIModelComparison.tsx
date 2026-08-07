import React, { useState, useEffect } from 'react';
import { Sparkles, Eye, Mic, Check, Zap, Award, DollarSign } from 'lucide-react';
import { gatewayService } from '../../services/gatewayService';

export const AIModelComparison: React.FC = () => {
  const [comparison, setComparison] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComparison();
  }, []);

  const fetchComparison = async () => {
    setLoading(true);
    try {
      const res = await gatewayService.getModelComparison();
      if (res.success) {
        setComparison(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch model comparison', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-brand-cyan" />
          Universal AI Model Benchmark & Capability Comparison Matrix
        </h2>
        <p className="text-xs text-text-muted mt-1">
          Compare MMLU score benchmarks, average latencies, context windows, and input/output cost profiles.
        </p>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/10 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 text-text-muted font-semibold uppercase tracking-wider text-[10px]">
              <th className="pb-3">Model Key</th>
              <th className="pb-3">Model Name</th>
              <th className="pb-3">Context Window</th>
              <th className="pb-3">Input Cost / 1k</th>
              <th className="pb-3">MMLU Score</th>
              <th className="pb-3">Avg Latency</th>
              <th className="pb-3">Multimodal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {comparison.map((item) => (
              <tr key={item.modelKey} className="hover:bg-white/5 transition-colors">
                <td className="py-3 font-bold text-brand-cyan font-mono">{item.modelKey}</td>
                <td className="py-3 font-semibold text-white">{item.modelName}</td>
                <td className="py-3 font-mono text-text-secondary font-semibold">{(item.contextWindow / 1000).toLocaleString()}k</td>
                <td className="py-3 font-mono text-emerald-400 font-semibold">${item.inputCostPer1k}</td>
                <td className="py-3 font-bold text-amber-400 font-mono">{item.benchmarkMmlu}%</td>
                <td className="py-3 font-mono text-text-secondary">{item.averageLatencyMs} ms</td>
                <td className="py-3 flex items-center gap-2">
                  {item.supportsVision && <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold">Vision</span>}
                  {item.supportsAudio && <span className="text-[10px] px-2 py-0.5 rounded-md bg-violet-500/10 border border-violet-500/30 text-violet-400 font-bold">Audio</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
