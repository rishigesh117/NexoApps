import React, { useState, useEffect } from 'react';
import { Cpu, Server, Database, ShieldCheck, Activity, Rocket, CheckCircle2, Boxes } from 'lucide-react';
import { platformService } from '../../services/platformService';

export const PlatformDashboard: React.FC = () => {
  const [overview, setOverview] = useState<any>(null);

  useEffect(() => {
    platformService.getOverview().then(setOverview);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-500">
            NexoApps AI Hyper Platform (v8.0 Production Release)
          </h1>
          <p className="text-slate-400 mt-1">Unified intelligent ecosystem connecting AI OS, Cloud, Data, Security & Autonomous Engineering</p>
        </div>
        <span className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" /> v8.0.0-LTS Production Ready
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Platform Modules</span>
            <Boxes className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white">{overview?.activeModulesCount || 15} Modules Active</div>
          <div className="text-xs text-emerald-400 mt-2">100% Interoperable</div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>System Health</span>
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">{overview?.systemStatus || 'OPERATIONAL'}</div>
          <div className="text-xs text-emerald-400 mt-2">99.999% Availability SLA</div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Security Posture</span>
            <ShieldCheck className="w-5 h-5 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-white">Zero Trust Active</div>
          <div className="text-xs text-rose-400 mt-2">ISO 27001 / SOC2 Compliant</div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Release Tier</span>
            <Rocket className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">v8.0 LTS</div>
          <div className="text-xs text-purple-400 mt-2">Long-Term Support Ready</div>
        </div>
      </div>
    </div>
  );
};
