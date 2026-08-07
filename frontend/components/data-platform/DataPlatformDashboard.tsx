import React, { useState, useEffect } from 'react';
import { Database, GitFork, HardDrive, ShieldCheck, Activity, Radio, BarChart3 } from 'lucide-react';
import { analyticsService } from '../../services/analyticsService';

export const DataPlatformDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    analyticsService.getMetrics().then(setMetrics);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
            AI Data Platform & Data Lakehouse Hub
          </h1>
          <p className="text-slate-400 mt-1">Enterprise data pipelines, analytics fabric, real-time streaming & metadata governance (v7.3)</p>
        </div>
        <span className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 animate-pulse" /> Platform Active (99.8% Data Quality)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Connected Sources</span>
            <Database className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">{metrics?.activeDataSources || 12} Data Sources</div>
          <div className="text-xs text-emerald-400 mt-2">Postgres, Snowflake, Kafka</div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Active Pipelines</span>
            <GitFork className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white">{metrics?.totalPipelines || 28} ETL/ELT DAGs</div>
          <div className="text-xs text-cyan-400 mt-2">100% Ingestion SLA</div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Daily Ingestion</span>
            <HardDrive className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{metrics?.dailyIngestionGb || 450.8} GB/day</div>
          <div className="text-xs text-blue-400 mt-2">Apache Iceberg Format</div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Streaming Topics</span>
            <Radio className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{metrics?.activeStreamTopics || 8} Active Topics</div>
          <div className="text-xs text-purple-400 mt-2">Kafka & Flink Engine</div>
        </div>
      </div>
    </div>
  );
};
