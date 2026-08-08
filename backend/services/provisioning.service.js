/**
 * Provisioning Service — NexoApps Phase 12E (v9.5)
 */

class ProvisioningService {
  constructor() {
    this.jobs = [
      { id: 'pjob-1', stackId: 'istack-1', action: 'apply', status: 'completed', startedAt: new Date(Date.now() - 3600000).toISOString(), completedAt: new Date(Date.now() - 3500000).toISOString() },
    ];
    this.logs = [
      { id: 'plog-1', jobId: 'pjob-1', logLevel: 'info', message: 'Applying Terraform stack nexoapps-core-vpc-infrastructure...', timestamp: new Date(Date.now() - 3600000).toISOString() },
      { id: 'plog-2', jobId: 'pjob-1', logLevel: 'info', message: 'Stack provisioned successfully with 0 errors.', timestamp: new Date(Date.now() - 3500000).toISOString() },
    ];
  }

  async getJobs(stackId) {
    if (stackId) return this.jobs.filter((j) => j.stackId === stackId);
    return this.jobs;
  }

  async getLogs(jobId) {
    if (jobId) return this.logs.filter((l) => l.jobId === jobId);
    return this.logs;
  }
}

module.exports = new ProvisioningService();
