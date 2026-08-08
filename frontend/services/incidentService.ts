import { IncidentRecord, IncidentEvent, IncidentAssignment } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export interface DetailedIncident extends IncidentRecord {
  timeline?: IncidentEvent[];
  assignments?: IncidentAssignment[];
}

export const incidentService = {
  async getIncidents(): Promise<IncidentRecord[]> {
    try {
      const res = await fetch(`${API_BASE}/observability/incidents`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'inc-901', title: 'AI Reasoning Engine Degradation & Latency Spike', description: 'Elevated p95 latency and 5xx error rate', severity: 'SEV2', status: 'INVESTIGATING', assignedTo: 'user_sre_lead_01', createdAt: new Date().toISOString() },
        { id: 'inc-902', title: 'Redis Cluster Primary Failover Event', description: 'Automatic failover triggered on global cache cluster', severity: 'SEV3', status: 'RESOLVED', assignedTo: 'user_devops_02', createdAt: new Date().toISOString(), resolvedAt: new Date().toISOString() },
      ];
    }
  },

  async getIncidentById(id: string): Promise<DetailedIncident | null> {
    try {
      const res = await fetch(`${API_BASE}/observability/incidents/${id}`);
      const json = await res.json();
      return json.data || null;
    } catch (err) {
      return null;
    }
  },

  async updateIncidentStatus(id: string, status: string, note?: string) {
    try {
      const res = await fetch(`${API_BASE}/observability/incidents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, note }),
      });
      const json = await res.json();
      return json.data;
    } catch (err) {
      return null;
    }
  },
};
