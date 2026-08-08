import React, { useEffect, useState } from 'react';
import { Cpu, Activity, AlertTriangle, TrendingUp, Sparkles, Bot } from 'lucide-react';
import { performanceIntelligenceService } from '../../services/performanceIntelligenceService';
import { PerformanceProfile, AIOperationalRecommendation } from '../../../shared/types';

export const PerformanceAnalytics: React.FC = () => {
  const [profiles, setProfiles] = useState<PerformanceProfile[]>([]);
  const [recs, setRecs] = useState<AIOperationalRecommendation[]>([]);

  useEffect(() => {
    Promise.all([
      performanceIntelligenceService.getProfiles(),
      performanceIntelligenceService.getAIRecommendations(),
    ]).then(([p, r]) => {
      setProfiles(p);
      setRecs(r);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-brand-cyan" /> Performance Intelligence & Bottleneck Analytics
        </h2>
      </div>

      {/* Performance Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profiles.map((prof) => (
          <div key={prof.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base font-display">{prof.serviceName}</h3>
              <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                prof.errorRatePct > 1.0 ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                p95: {prof.p95LatencyMs}ms
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
              <div className="p-2 rounded bg-black/20">
                <span className="text-text-muted text-[10px] block">CPU Avg</span>
                <span className="font-mono text-white font-bold">{prof.cpuAvgPct}%</span>
              </div>
              <div className="p-2 rounded bg-black/20">
                <span className="text-text-muted text-[10px] block">RAM Avg</span>
                <span className="font-mono text-white font-bold">{prof.memoryAvgMb}MB</span>
              </div>
              <div className="p-2 rounded bg-black/20">
                <span className="text-text-muted text-[10px] block">Error Rate</span>
                <span className="font-mono text-amber-400 font-bold">{prof.errorRatePct}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Advisory Recommendations */}
      <div className="p-6 rounded-xl glass-panel border border-brand-cyan/20 bg-gradient-to-r from-brand-cyan/5 to-transparent space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-cyan" /> Advisory Optimization Insights
        </h3>
        <div className="space-y-3">
          {recs.map((r) => (
            <div key={r.id} className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{r.detectedIssue} &rarr; <span className="text-brand-cyan">{r.affectedService}</span></span>
                <span className="text-amber-400 uppercase font-semibold">{r.severity} severity</span>
              </div>
              <p className="text-xs text-text-muted">{r.evidence}</p>
              <div className="text-xs text-brand-cyan flex items-center gap-1.5 pt-1">
                <Bot className="w-4 h-4" />
                <span><strong>Action:</strong> {r.recommendedAction}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
