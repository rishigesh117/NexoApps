import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Server,
  Shield,
  Activity,
  Cpu,
  DollarSign,
  Cloud,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  Zap,
  Radio,
  Layers,
} from 'lucide-react';
import { cloudControlService } from '../../services/cloudControlService';
import { cloudRegionService } from '../../services/cloudRegionService';

export const CloudControlDashboard: React.FC = () => {
  const [overview, setOverview] = useState<any>(null);
  const [regions, setRegions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const [ov, reg] = await Promise.all([
      cloudControlService.getOverview(),
      cloudRegionService.getRegions(),
    ]);
    setOverview(ov);
    setRegions(reg);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-text-muted flex items-center justify-center gap-3">
        <RefreshCw className="w-5 h-5 animate-spin text-brand-cyan" />
        <span>Loading Global Cloud Control Plane...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-text-muted tracking-wider">Multi-Cloud Regions</span>
            <div className="p-2 rounded-lg bg-brand-cyan/10 text-brand-cyan">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">{overview?.regionsCount} Regions</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Operational
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
            <span className="text-xs uppercase font-semibold text-text-muted tracking-wider">Cloud Accounts</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Cloud className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">{overview?.accountsCount} Accounts</span>
            <span className="text-xs text-brand-cyan font-medium">AWS & GCP</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-text-muted tracking-wider">Monthly Spend</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">${overview?.costSummary?.totalSpendUsd?.toLocaleString()}</span>
            <span className="text-xs text-text-muted font-medium">/ ${overview?.costSummary?.totalBudgetUsd?.toLocaleString()}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-text-muted tracking-wider">DR Status</span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <Shield className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">{overview?.drPlansCount} Plans</span>
            <span className="text-xs text-emerald-400 font-medium">RPO 60s / RTO 15m</span>
          </div>
        </motion.div>
      </div>

      {/* Regions Grid */}
      <div className="p-6 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-4">
        <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-brand-cyan" /> Global Regional Deployments
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {regions.map((reg) => (
            <div key={reg.id} className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-brand-cyan font-bold">{reg.regionCode}</span>
                <span className="text-emerald-400 font-bold uppercase text-[10px]">{reg.status}</span>
              </div>
              <h4 className="font-bold text-white text-sm">{reg.regionName}</h4>
              <div className="text-[11px] text-text-muted">Lat: {reg.locationLat}, Lng: {reg.locationLng}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
