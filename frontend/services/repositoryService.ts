import { fetchApi } from './apiClient';
import { Repository, Branch, MergeRequest } from '../../shared/types';

export const getRepositories = async (): Promise<Repository[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: Repository[] }>('/developer-cloud/repositories/repos');
    return res.data;
  } catch {
    return [
      { id: 'repo-101', orgId: 'org-dev-1', repoName: 'nexoapps-platform-core', slug: 'nexoapps-platform-core', defaultBranch: 'main', isPrivate: true, createdAt: new Date().toISOString() },
      { id: 'repo-102', orgId: 'org-dev-1', repoName: 'nexo-ai-models-runtime', slug: 'nexo-ai-models-runtime', defaultBranch: 'main', isPrivate: true, createdAt: new Date().toISOString() }
    ];
  }
};

export const getBranches = async (repoId?: string): Promise<Branch[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: Branch[] }>('/developer-cloud/repositories/branches');
    return res.data;
  } catch {
    return [
      { id: 'br-1', repoId: repoId || 'repo-101', branchName: 'main', headCommitHash: 'sha256:7f9a1b...', isProtected: true, createdAt: new Date().toISOString() },
      { id: 'br-2', repoId: repoId || 'repo-101', branchName: 'feature/v8.1-release', headCommitHash: 'sha256:8c2d4e...', isProtected: false, createdAt: new Date().toISOString() }
    ];
  }
};

export const getMergeRequests = async (repoId?: string): Promise<MergeRequest[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: MergeRequest[] }>('/developer-cloud/repositories/merge-requests');
    return res.data;
  } catch {
    return [
      { id: 'mr-101', repoId: repoId || 'repo-101', mrNumber: 142, title: 'Release v8.1 AI Developer Cloud Features', sourceBranch: 'feature/v8.1-release', targetBranch: 'main', status: 'open', authorId: 'user-admin', createdAt: new Date().toISOString() }
    ];
  }
};

export const repositoryService = {
  getRepositories,
  getBranches,
  getMergeRequests,
  listPullRequests: async (id?: string) => ({ success: true, data: await getMergeRequests(id) }),
  getRepo: async (id: string) => ({ success: true, data: { id, repoName: 'nexoapps-platform-core', defaultBranch: 'main' } }),
  listBranches: async (id?: string) => ({ success: true, data: await getBranches(id) }),
  listCommits: async (id?: string) => ({
    success: true,
    data: [
      { id: 'c1', commitHash: 'sha256:7f9a1b...', authorName: 'Lead Dev', commitMessage: 'Initial release', committedAt: new Date().toISOString() }
    ]
  })
};
