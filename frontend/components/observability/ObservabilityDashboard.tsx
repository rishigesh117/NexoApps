import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Server,
  AlertTriangle,
  HeartPulse,
  Cpu,
  Database,
  Layers,
  Sparkles,
  Bot,
  RefreshCw,
  Clock,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { observabilityService } from '../../services/observabilityService';
import { performanceIntelligenceService } from '../../services/performanceIntelligenceService';
import { AIOperationalRecommendation } from '../../../shared/types';

export const ObservabilityDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<AIOperationalRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [overview, recs] = await Promise.all([
        observabilityService.getOverview(),
        performanceIntelligenceService.getAIRecommendations(),
      ]);
      setData(overview);
      setRecommendations(recs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-text-muted flex items-center justify-center gap-3">
        <RefreshCw className="w-5 h-5 animate-spin text-brand-cyan" />
        <span>Loading NexoApps Telemetry & Operations Dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-text-muted tracking-wider">System Health Score</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <HeartPulse className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">{data?.systemHealthScore}%</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Operational
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-text-muted tracking-wider">Active Incidents</span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">{data?.activeIncidentsCount}</span>
            <span className="text-xs text-text-muted font-medium">Require triage</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-text-muted tracking-wider">Monitored Services</span>
            <div className="p-2 rounded-lg bg-brand-cyan/10 text-brand-cyan">
              <Server className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">{data?.servicesCount}</span>
            <span className="text-xs text-brand-cyan font-medium">Across {data?.projectsCount} projects</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-text-muted tracking-wider">Uptime Availability</span>
            <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">{data?.uptimeStats?.overallAvailabilityPct}%</span>
            <span className="text-xs text-emerald-400 font-medium">{data?.uptimeStats?.passingChecks} passing checks</span>
          </div>
        </motion.div>
      </div>

      {/* AI Intelligent Operations Section */}
      <div className="p-6 rounded-xl glass-panel border border-brand-cyan/20 bg-gradient-to-r from-brand-cyan/5 via-brand-purple/5 to-transparent">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-tr from-brand-cyan to-brand-violet text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
              AI-Assisted Operations & Performance Intelligence
            </h2>
            <p className="text-xs text-text-muted">Automated anomaly detection, bottleneck risk mapping, and advisory remediation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-0.5 rounded font-semibold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {rec.severity} severity
                </span>
                <span className="text-[11px] text-text-muted font-mono">Confidence: {(rec.confidence * 100).toFixed(0)}%</span>
              </div>
              <h3 className="font-semibold text-sm text-white">{rec.detectedIssue}</h3>
              <p className="text-xs text-text-muted">{rec.evidence}</p>
              <div className="pt-2 border-t border-white/10 flex items-start gap-2 text-xs text-brand-cyan">
                <Bot className="w-4 h-4 shrink-0 mt-0.5" />
                <span><strong className="text-white">Recommendation:</strong> {rec.recommendedAction}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Overview Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Telemetry Overview */}
        <div className="p-6 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-4">
          <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-brand-cyan" /> Core Metric Utilization
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-text-muted mb-1">
                <span>Cluster CPU Utilization</span>
                <span className="text-white font-mono">24.5%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-brand-cyan h-full rounded-full" style={{ width: '24.5%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-text-muted mb-1">
                <span>RAM Allocation</span>
                <span className="text-white font-mono">48.2%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-brand-blue h-full rounded-full" style={{ width: '48.2%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-text-muted mb-1">
                <span>PostgreSQL & Redis Storage Usage</span>
                <span className="text-white font-mono">38.5%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-400 h-full rounded-full" style={{ width: '38.5%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 12A/12B Infrastructure Status */}
        <div className="p-6 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-4">
          <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-purple-400" /> Integrated Infrastructure (Phase 12A & 12B)
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">PostgreSQL Primary Database Cluster</span>
              </div>
              <span className="text-emerald-400 font-medium">Replication Synced</span>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">Global Redis Distributed Cache</span>
              </div>
              <span className="text-emerald-400 font-medium">3 Nodes Online</span>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">Background Worker Queue Engine</span>
              </div>
              <span className="text-emerald-400 font-medium">0 Backlog Lag</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
