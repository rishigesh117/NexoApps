import React, { useState, useEffect } from 'react';
import { Cloud, Server, Database, Network, ShieldCheck, Activity, Cpu, HardDrive } from 'lucide-react';
import { cloudPlatformService } from '../../services/cloudPlatformService';

export const CloudDashboard: React.FC = () => {
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    cloudPlatformService.getHealth().then(setHealth);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            AI Cloud Infrastructure Platform
          </h1>
          <p className="text-slate-400 mt-1">Multi-tenant architecture & enterprise resource management hub (v7.2)</p>
        </div>
        <span className="px-3.5 py-1.5 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 animate-pulse" /> Cloud Active (99.99% Uptime)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Total vCPUs</span>
            <Cpu className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white">512 Allocated</div>
          <div className="text-xs text-cyan-400 mt-2">128 vCPUs Active</div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>NVIDIA AI GPUs</span>
            <Server className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">32 H100 GPUs</div>
          <div className="text-xs text-emerald-400 mt-2">16 Clusters Online</div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Object & NVMe Storage</span>
            <HardDrive className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">100 TB Capable</div>
          <div className="text-xs text-blue-400 mt-2">12.4 TB Utilized</div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Virtual Networks</span>
            <Network className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">8 VNETs</div>
          <div className="text-xs text-purple-400 mt-2">Isolated VPC Subnets</div>
        </div>
      </div>
    </div>
  );
};
