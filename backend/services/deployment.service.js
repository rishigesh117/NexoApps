/**
 * Deployment Manager Service
 * NexoApps Platform - Phase 5E (Version 2.0 EC1)
 */

class DeploymentService {
  constructor() {
    this.deployments = [
      {
        id: 'dep-1001',
        environment: 'Production',
        version: 'v2.0.0-EC1',
        commitHash: 'edf5da5',
        deployedBy: 'Rishigesh (Platform Owner)',
        status: 'SUCCESS',
        deployedAt: new Date().toISOString(),
      },
      {
        id: 'dep-1002',
        environment: 'Staging',
        version: 'v1.0.0-RC1',
        commitHash: '84c21e7',
        deployedBy: 'CI/CD GitHub Actions',
        status: 'SUCCESS',
        deployedAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
  }

  getDeployments() {
    return this.deployments;
  }
}

module.exports = new DeploymentService();
