/**
 * Repository Service — NexoApps Phase 11A (v8.1)
 * Enterprise source code repositories, branch policies, commits, and merge requests.
 */

class RepositoryService {
  constructor() {
    this.repositories = [
      { id: 'repo-101', orgId: 'org-dev-1', repoName: 'nexoapps-platform-core', slug: 'nexoapps-platform-core', defaultBranch: 'main', isPrivate: true, createdAt: new Date().toISOString() },
      { id: 'repo-102', orgId: 'org-dev-1', repoName: 'nexo-ai-models-runtime', slug: 'nexo-ai-models-runtime', defaultBranch: 'main', isPrivate: true, createdAt: new Date().toISOString() }
    ];
    this.branches = [
      { id: 'br-1', repoId: 'repo-101', branchName: 'main', headCommitHash: 'sha256:7f9a1b...', isProtected: true, createdAt: new Date().toISOString() },
      { id: 'br-2', repoId: 'repo-101', branchName: 'feature/v8.1-release', headCommitHash: 'sha256:8c2d4e...', isProtected: false, createdAt: new Date().toISOString() }
    ];
    this.mergeRequests = [
      { id: 'mr-101', repoId: 'repo-101', mrNumber: 142, title: 'Release v8.1 AI Developer Cloud Features', sourceBranch: 'feature/v8.1-release', targetBranch: 'main', status: 'open', authorId: 'user-admin', createdAt: new Date().toISOString() }
    ];
  }

  async getRepositories() {
    return this.repositories;
  }

  async getBranches() {
    return this.branches;
  }

  async getMergeRequests() {
    return this.mergeRequests;
  }
}

module.exports = new RepositoryService();
