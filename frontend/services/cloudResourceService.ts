import { CloudResource, ResourceType } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const cloudResourceService = {
  async getResources(): Promise<CloudResource[]> {
    try {
      const res = await fetch(`${API_BASE}/cloud-control/resources`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'cres-1', accountId: 'cacc-1', regionId: 'creg-1', resourceTypeId: 'rtype-k8s', resourceName: 'prod-us-east-1-k8s-cluster', providerResourceId: 'arn:aws:eks:us-east-1:123456789012:cluster/prod-us-east-1', status: 'running', createdAt: new Date().toISOString() },
        { id: 'cres-2', accountId: 'cacc-2', regionId: 'creg-2', resourceTypeId: 'rtype-db', resourceName: 'prod-eu-central-1-pg-cluster', providerResourceId: 'projects/nexoapps-ai-prod/instances/pg-eu-01', status: 'running', createdAt: new Date().toISOString() },
      ];
    }
  },

  async getResourceTypes(): Promise<ResourceType[]> {
    try {
      const res = await fetch(`${API_BASE}/cloud-control/resources/types`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'rtype-k8s', typeName: 'Kubernetes Cluster (EKS/GKE/AKS)', category: 'k8s_cluster', createdAt: new Date().toISOString() },
        { id: 'rtype-db', typeName: 'Managed PostgreSQL Database Cluster', category: 'database', createdAt: new Date().toISOString() },
      ];
    }
  },
};
