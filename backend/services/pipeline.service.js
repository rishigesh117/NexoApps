/**
 * Pipeline Service — NexoApps Phase 11A (v8.1)
 * CI/CD Pipeline definitions, automated runs, and job execution logs.
 */

class PipelineService {
  constructor() {
    this.pipelines = [
      { id: 'pip-101', repoId: 'repo-101', pipelineName: 'Production Build & Containerize Pipeline', configYaml: 'version: 2.1\njobs:\n  build:\n    docker:\n      - image: node:18', isActive: true, createdAt: new Date().toISOString() }
    ];
    this.runs = [
      { id: 'run-901', pipelineId: 'pip-101', runNumber: 104, status: 'success', startedAt: new Date(Date.now() - 300000).toISOString(), finishedAt: new Date().toISOString() }
    ];
  }

  async getPipelines() {
    return this.pipelines;
  }

  async getRuns() {
    return this.runs;
  }
}

module.exports = new PipelineService();
