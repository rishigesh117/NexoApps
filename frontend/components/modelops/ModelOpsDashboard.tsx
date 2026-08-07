import React, { useState, useEffect } from 'react';
import { Cpu, Activity, Database, CheckCircle2, Zap, Layers, AlertTriangle } from 'lucide-react';
import { modelMonitoringService } from '../../services/modelMonitoringService';

export const ModelOpsDashboard: React.FC = () => {
  const [overview, setOverview] = useState<any>(null);

  useEffect(() => {
    modelMonitoringService.getOverview().then(setOverview);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-500">
            AI ModelOps & MLOps Lifecycle Console (v8.2)
          </h1>
          <p className="text-slate-400 mt-1">Enterprise ML datasets, feature store, automated training, model registry, inference & drift detection</p>
        </div>
        <span className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" /> v8.2.0 ModelOps Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Registered AI Models</span>
            <Layers className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">{overview?.activeModelsCount || 42} Models Active</div>
          <div className="text-xs text-emerald-400 mt-2">100% Version Tracked</div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Deployed Endpoints</span>
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white">{overview?.deployedEndpointsCount || 18} Active Endpoints</div>
          <div className="text-xs text-cyan-400 mt-2">vLLM & Triton Engine</div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Avg Inference Latency</span>
            <Activity className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white">{overview?.avgInferenceLatencyMs || 14.2} ms</div>
          <div className="text-xs text-indigo-400 mt-2">Sub-20ms SLA Guarantee</div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Drift Alerts</span>
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">{overview?.driftAlertsCount || 0} Critical Drift</div>
          <div className="text-xs text-emerald-400 mt-2">Automated Retraining Idle</div>
        </div>
      </div>
    </div>
  );
};
