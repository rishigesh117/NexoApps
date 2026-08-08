import { DisasterRecoveryPlan, DisasterRecoveryExecution } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const disasterRecoveryService = {
  async getPlans(): Promise<DisasterRecoveryPlan[]> {
    try {
      const res = await fetch(`${API_BASE}/cloud-control/disaster-recovery/plans`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'drp-1', planName: 'Production Core VPC Active-Passive Regional DR Plan', primaryRegionId: 'creg-1', drRegionId: 'creg-2', rpoSeconds: 60, rtoMinutes: 15, status: 'ready', createdAt: new Date().toISOString() },
        { id: 'drp-2', planName: 'AI ModelOps Cross-Cloud Database DR Backup Plan', primaryRegionId: 'creg-2', drRegionId: 'creg-3', rpoSeconds: 300, rtoMinutes: 30, status: 'ready', createdAt: new Date().toISOString() },
      ];
    }
  },

  async getExecutions(planId?: string): Promise<DisasterRecoveryExecution[]> {
    try {
      const query = planId ? `?planId=${planId}` : '';
      const res = await fetch(`${API_BASE}/cloud-control/disaster-recovery/executions${query}`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'drex-1', planId: 'drp-1', executionType: 'drill', status: 'completed', startedAt: new Date(Date.now() - 86400000).toISOString(), completedAt: new Date(Date.now() - 85500000).toISOString() },
      ];
    }
  },
};
