/**
 * Edge Workload Service — NexoApps Phase 12E (v9.5)
 */

class EdgeWorkloadService {
  constructor() {
    this.workloads = [
      { id: 'ewl-1', workloadName: 'edge-auth-token-validator', containerImage: 'nexoapps/edge-auth:v9.5.0', targetScope: 'all_edge_pops', replicasPerPop: 2, status: 'active', createdAt: new Date().toISOString() },
      { id: 'ewl-2', workloadName: 'edge-ai-inference-accelerator', containerImage: 'nexoapps/edge-model-runner:v9.5.0', targetScope: 'regional_edge', replicasPerPop: 4, status: 'active', createdAt: new Date().toISOString() },
    ];
  }

  async getWorkloads() {
    return this.workloads;
  }

  async createWorkload(data) {
    const w = {
      id: `ewl-${Date.now()}`,
      workloadName: data.workloadName,
      containerImage: data.containerImage,
      targetScope: data.targetScope || 'all_edge_pops',
      replicasPerPop: Number(data.replicasPerPop) || 2,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    this.workloads.push(w);
    return w;
  }
}

module.exports = new EdgeWorkloadService();
