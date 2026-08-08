/**
 * Edge Deployment Service — NexoApps Phase 12E (v9.5)
 */

class EdgeDeploymentService {
  constructor() {
    this.deployments = [
      { id: 'edep-1', workloadId: 'ewl-1', edgeLocationCode: 'US-EAST-IAD', deployedStatus: 'running', deployedAt: new Date().toISOString() },
      { id: 'edep-2', workloadId: 'ewl-1', edgeLocationCode: 'EU-WEST-FRA', deployedStatus: 'running', deployedAt: new Date().toISOString() },
      { id: 'edep-3', workloadId: 'ewl-2', edgeLocationCode: 'AP-SOUTH-BOM', deployedStatus: 'running', deployedAt: new Date().toISOString() },
    ];
  }

  async getDeployments(workloadId) {
    if (workloadId) return this.deployments.filter((d) => d.workloadId === workloadId);
    return this.deployments;
  }
}

module.exports = new EdgeDeploymentService();
