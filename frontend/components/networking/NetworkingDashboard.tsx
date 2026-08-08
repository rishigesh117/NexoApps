import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Server,
  Shield,
  Activity,
  Zap,
  Lock,
  Radio,
  CheckCircle2,
  TrendingUp,
  Cpu,
  RefreshCw,
  Sliders,
  Layers,
} from 'lucide-react';
import { networkingService } from '../../services/networkingService';

export const NetworkingDashboard: React.FC = () => {
  const [overview, setOverview] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await networkingService.getOverview();
    setOverview(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-text-muted flex items-center justify-center gap-3">
        <RefreshCw className="w-5 h-5 animate-spin text-brand-cyan" />
        <span>Loading Enterprise Networking & Edge Control Center...</span>
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
            <span className="text-xs uppercase font-semibold text-text-muted tracking-wider">API Gateways</span>
            <div className="p-2 rounded-lg bg-brand-cyan/10 text-brand-cyan">
              <Server className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">{overview?.gatewaysCount}</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Active Ingress
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
            <span className="text-xs uppercase font-semibold text-text-muted tracking-wider">Edge Locations</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">3 POPs</span>
            <span className="text-xs text-brand-cyan font-medium">8.5ms avg latency</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-text-muted tracking-wider">Throughput Volume</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">{(overview?.analytics?.totalRequests / 1000000).toFixed(2)}M</span>
            <span className="text-xs text-text-muted font-medium">Requests</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-text-muted tracking-wider">WAF & Firewall</span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <Shield className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">{overview?.wafPoliciesCount} Policies</span>
            <span className="text-xs text-emerald-400 font-medium">100% Protected</span>
          </div>
        </motion.div>
      </div>

      {/* Grid Overview Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network Infrastructure Health */}
        <div className="p-6 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-4">
          <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
            <Radio className="w-4 h-4 text-brand-cyan" /> Core Network Health Status
          </h3>
          <div className="space-y-3">
            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">Production Ingress Reverse Proxy Gateway</span>
              </div>
              <span className="text-emerald-400 font-mono">14.5ms p95</span>
            </div>
            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">Global Layer 7 Load Balancer Array</span>
              </div>
              <span className="text-emerald-400 font-mono">8.2ms p95</span>
            </div>
            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">Private Internal DNS Zone (nexoapps.internal)</span>
              </div>
              <span className="text-emerald-400 font-mono">0.0% Loss</span>
            </div>
          </div>
        </div>

        {/* Global Edge Locations Status */}
        <div className="p-6 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-4">
          <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-400" /> Global Edge POP Network
          </h3>
          <div className="space-y-3">
            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-white">US-EAST-IAD (Ashburn, VA)</div>
                <div className="text-[10px] text-text-muted">Primary Regional Edge Hub</div>
              </div>
              <span className="text-emerald-400 font-mono font-bold">8.5ms</span>
            </div>
            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-white">EU-WEST-FRA (Frankfurt, DE)</div>
                <div className="text-[10px] text-text-muted">European Edge POP</div>
              </div>
              <span className="text-emerald-400 font-mono font-bold">14.2ms</span>
            </div>
            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-white">AP-SOUTH-BOM (Mumbai, IN)</div>
                <div className="text-[10px] text-text-muted">Asia-Pacific Edge POP</div>
              </div>
              <span className="text-emerald-400 font-mono font-bold">22.0ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
