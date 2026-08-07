import React, { useState, useEffect } from 'react';
import { GitBranch, GitCommit, GitPullRequest } from 'lucide-react';
import { repositoryService } from '../../services/repositoryService';

interface RepositoryExplorerProps {
  projectId?: string;
}

export const RepositoryExplorer: React.FC<RepositoryExplorerProps> = ({ projectId = 'proj-demo-1' }) => {
  const [repo, setRepo] = useState<any>(null);
  const [branches, setBranches] = useState<any[]>([]);
  const [commits, setCommits] = useState<any[]>([]);

  useEffect(() => {
    fetchRepoData();
  }, [projectId]);

  const fetchRepoData = async () => {
    try {
      const [rRes, bRes, cRes] = await Promise.all([
        repositoryService.getRepo(projectId),
        repositoryService.listBranches(projectId),
        repositoryService.listCommits(projectId)
      ]);
      if (rRes.success) setRepo(rRes.data);
      if (bRes.success) setBranches(bRes.data);
      if (cRes.success) setCommits(cRes.data);
    } catch (err) {
      console.error('Failed to load repository data', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-brand-cyan" />
            {repo?.repoName || 'fintech-api-engine-repo'}
          </h3>
          <p className="text-xs text-text-muted mt-0.5">Default Branch: {repo?.defaultBranch || 'main'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-brand-cyan" /> Branches
          </h4>
          {branches.map((b) => (
            <div key={b.id} className="p-3 rounded-xl bg-surface-100 border border-white/10 text-xs font-mono flex items-center justify-between">
              <span className="text-white font-bold">{b.branchName}</span>
              <span className="text-text-muted text-[10px]">{b.headCommitHash}</span>
            </div>
          ))}
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-brand-violet" /> Commit History
          </h4>
          {commits.map((c) => (
            <div key={c.id} className="p-3 rounded-xl bg-surface-100 border border-white/10 text-xs space-y-1">
              <p className="text-white font-bold">{c.commitMessage}</p>
              <p className="text-text-muted text-[10px] font-mono">Commit {c.commitHash} by {c.authorName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
