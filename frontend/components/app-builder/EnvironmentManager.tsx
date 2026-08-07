import React, { useState, useEffect } from 'react';
import { Server, Activity, Globe, RefreshCw } from 'lucide-react';
import { deploymentPipelineService } from '../../services/deploymentPipelineService';

interface EnvironmentManagerProps {
  applicationId?: string;
}

export const EnvironmentManager: React.FC<EnvironmentManagerProps> = ({ applicationId = 'app-demo-1' }) => {
  const [environments, setEnvironments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnvs();
  }, [applicationId]);

  const fetchEnvs = async () => {
    setLoading(true);
    try {
      const res = await deploymentPipelineService.listEnvironments(applicationId);
      if (res.success) {
        setEnvironments(res.data);
      }
    } catch (err) {
      console.error('Failed to load environments', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-brand-cyan" />
            Environment Manager & Infrastructure Targets
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Isolated Development, Staging, and Production environment configurations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {environments.map((env) => (
          <div key={env.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">{env.environmentName}</h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Active
              </span>
            </div>
            <p className="text-xs font-mono text-brand-cyan truncate">{env.baseUrl}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
