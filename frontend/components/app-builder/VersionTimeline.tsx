import React, { useState, useEffect } from 'react';
import { History, GitCommit, RotateCcw } from 'lucide-react';
import { deploymentPipelineService } from '../../services/deploymentPipelineService';

interface VersionTimelineProps {
  applicationId?: string;
}

export const VersionTimeline: React.FC<VersionTimelineProps> = ({ applicationId = 'app-demo-1' }) => {
  const [versions, setVersions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVersions();
  }, [applicationId]);

  const fetchVersions = async () => {
    setLoading(true);
    try {
      const res = await deploymentPipelineService.listVersions(applicationId);
      if (res.success) setVersions(res.data);
    } catch (err) {
      console.error('Failed to load version history', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-brand-cyan" />
            Application Version Timeline & Snapshot History
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Commit history, snapshot rollbacks, and release tag audit trail.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {versions.map((v) => (
          <div key={v.id} className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
                <GitCommit className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono">Version {v.versionNumber}</h3>
                <p className="text-xs text-text-muted mt-0.5">{v.changelog}</p>
              </div>
            </div>
            <button className="px-3.5 py-1.5 rounded-xl bg-surface-100 border border-white/10 hover:border-brand-cyan/40 text-text-secondary hover:text-white text-xs font-semibold flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Rollback Snapshot</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
