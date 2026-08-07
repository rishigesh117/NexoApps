import React, { useState, useEffect } from 'react';
import { GitPullRequest, Check } from 'lucide-react';
import { repositoryService } from '../../services/repositoryService';

interface PullRequestCenterProps {
  projectId?: string;
}

export const PullRequestCenter: React.FC<PullRequestCenterProps> = ({ projectId = 'proj-demo-1' }) => {
  const [prs, setPrs] = useState<any[]>([]);

  useEffect(() => {
    fetchPrs();
  }, [projectId]);

  const fetchPrs = async () => {
    try {
      const res = await repositoryService.listPullRequests(projectId);
      if (res.success) setPrs(res.data);
    } catch (err) {
      console.error('Failed to load pull requests', err);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <GitPullRequest className="w-5 h-5 text-brand-cyan" />
        Pull Request & Code Integration Center
      </h3>

      <div className="space-y-3">
        {prs.map((pr) => (
          <div key={pr.id} className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-brand-cyan">#{pr.prNumber}</span>
              <h4 className="text-sm font-bold text-white mt-0.5">{pr.title}</h4>
              <p className="text-xs text-text-muted mt-0.5">{pr.sourceBranch} → {pr.targetBranch}</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
              {pr.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
