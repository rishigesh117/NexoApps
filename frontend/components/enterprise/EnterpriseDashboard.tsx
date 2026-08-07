import React, { useEffect, useState } from 'react';
import { Globe, ShieldCheck, Zap, Layers, Cpu, Server, Activity, ArrowUpRight } from 'lucide-react';
import { getEnterpriseOverview } from '../../services/enterpriseService';
import { EnterpriseRegistry, EnterpriseModule, EnterpriseService } from '../../../shared/types';

export const EnterpriseDashboard: React.FC = () => {
  const [overview, setOverview] = useState<{ registry: EnterpriseRegistry; modules: EnterpriseModule[]; services: EnterpriseService[] } | null>(null);

  useEffect(() => {
    getEnterpriseOverview().then(setOverview);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Globe className="w-7 h-7 text-brand-cyan" /> NexoApps AI Enterprise Universe
          </h1>
          <p className="text-text-muted text-sm">
            Unified Production Release — Version 9.0 (Phases 1A through 11E Complete)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1 bg-gradient-to-r from-brand-cyan to-brand-violet text-background font-black rounded-full text-xs uppercase tracking-wider">
            v9.0 Production Live
          </span>
          <span className="px-3.5 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-semibold rounded-full text-xs">
            100% Backward Compatible
          </span>
        </div>
      </div>

      {/* Hero Subsystems Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-text-muted text-xs uppercase tracking-wider font-semibold">Active Subsystems</div>
            <div className="text-3xl font-bold text-white mt-1">11 Platforms</div>
          </div>
          <div className="p-3 bg-brand-cyan/20 text-brand-cyan rounded-xl">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-text-muted text-xs uppercase tracking-wider font-semibold">Enterprise License</div>
            <div className="text-2xl font-bold text-white mt-1 uppercase tracking-tight text-emerald-400">Unlimited</div>
          </div>
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-text-muted text-xs uppercase tracking-wider font-semibold">AI Services</div>
            <div className="text-3xl font-bold text-white mt-1">Operational</div>
          </div>
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
            <Cpu className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-text-muted text-xs uppercase tracking-wider font-semibold">Global Health</div>
            <div className="text-3xl font-bold text-white mt-1 text-cyan-400">100%</div>
          </div>
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Modules & Services Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-brand-cyan" /> Unified Enterprise Modules (v9.0)
          </h2>
          <div className="space-y-3">
            {overview?.modules.map((mod) => (
              <div key={mod.id} className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white text-sm">{mod.moduleName}</h4>
                  <span className="text-xs text-text-muted uppercase tracking-wider">{mod.category} • v{mod.version}</span>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg">Active</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-purple-400" /> Enterprise Microservices & Engines
          </h2>
          <div className="space-y-3">
            {overview?.services.map((srv) => (
              <div key={srv.id} className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white text-sm">{srv.serviceName}</h4>
                  <span className="text-xs text-text-muted">{srv.serviceType}</span>
                </div>
                <span className="px-2.5 py-1 bg-brand-cyan/20 text-brand-cyan text-xs font-semibold rounded-lg">{srv.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
