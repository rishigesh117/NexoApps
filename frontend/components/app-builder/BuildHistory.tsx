import React, { useState, useEffect } from 'react';
import { Terminal, CheckCircle2, Clock, RefreshCw } from 'lucide-react';
import { deploymentPipelineService } from '../../services/deploymentPipelineService';

interface BuildHistoryProps {
  applicationId?: string;
}

export const BuildHistory: React.FC<BuildHistoryProps> = ({ applicationId = 'app-demo-1' }) => {
  const [builds, setBuilds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuilds();
  }, [applicationId]);

  const fetchBuilds = async () => {
    setLoading(true);
    try {
      const res = await deploymentPipelineService.listBuilds(applicationId);
      if (res.success) setBuilds(res.data);
    } catch (err) {
      console.error('Failed to load builds', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-brand-cyan" />
            Build Compilation Pipeline & Console Telemetry
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Build logs, execution duration, asset bundling results, and compilation status.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {builds.map((b) => (
          <div key={b.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white font-mono">Build #{b.buildNumber}</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> {b.status} ({b.durationSec}s)
              </span>
            </div>
            <pre className="p-3 rounded-xl bg-background/80 border border-white/10 font-mono text-[11px] text-text-secondary whitespace-pre-wrap">
              {b.logs}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};
