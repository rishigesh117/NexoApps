import React from 'react';
import { Cpu, Server, Database, ShieldCheck, Layers } from 'lucide-react';

export const PlatformOverview: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">NexoApps AI Hyper Platform Subsystems</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <Cpu className="w-6 h-6 text-cyan-400 mb-3" />
          <h3 className="font-semibold text-white text-lg mb-1">AI Operating System (v7.0)</h3>
          <p className="text-xs text-slate-400">Centralized orchestration, unified navigation, activity center, and global search.</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <Server className="w-6 h-6 text-emerald-400 mb-3" />
          <h3 className="font-semibold text-white text-lg mb-1">AI Cloud Infrastructure (v7.2)</h3>
          <p className="text-xs text-slate-400">Multi-tenant VPCs, Kubernetes clusters, NVIDIA GPU instances, and block storage.</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <Database className="w-6 h-6 text-blue-400 mb-3" />
          <h3 className="font-semibold text-white text-lg mb-1">AI Data Platform (v7.3)</h3>
          <p className="text-xs text-slate-400">Enterprise Data Lakehouse (Iceberg), ETL pipelines, real-time streaming, and BI analytics.</p>
        </div>
      </div>
    </div>
  );
};
