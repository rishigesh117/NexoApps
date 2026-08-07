import React, { useState, useEffect } from 'react';
import { Terminal, GitBranch, Play, Cpu, CheckCircle2, Rocket, Server } from 'lucide-react';
import { developerCloudService } from '../../services/developerCloudService';

export const DeveloperCloudDashboard: React.FC = () => {
  const [overview, setOverview] = useState<any>(null);

  useEffect(() => {
    developerCloudService.getOverview().then(setOverview);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-500">
            AI Developer Cloud & DevOps Console (v8.1)
          </h1>
          <p className="text-slate-400 mt-1">Enterprise SCM, automated CI/CD pipelines, container registry, build runners & IaC</p>
        </div>
        <span className="px-3.5 py-1.5 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" /> v8.1.0 DevOps Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Deployment Frequency</span>
            <Rocket className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">{overview?.deploymentFrequency || '24 / day'}</div>
          <div className="text-xs text-emerald-400 mt-2">DORA High Performer</div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Lead Time for Changes</span>
            <Play className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white">{overview?.leadTimeForChanges || '14 mins'}</div>
          <div className="text-xs text-cyan-400 mt-2">Automated CI/CD</div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Change Failure Rate</span>
            <CheckCircle2 className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white">{overview?.changeFailureRate || '0.01%'}</div>
          <div className="text-xs text-indigo-400 mt-2">Zero-Downtime Rollouts</div>
        </div>

        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span>Active Build Runners</span>
            <Cpu className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{overview?.activeRunnersCount || 12} Runners Online</div>
          <div className="text-xs text-purple-400 mt-2">Kubernetes & GPU Pool</div>
        </div>
      </div>
    </div>
  );
};
