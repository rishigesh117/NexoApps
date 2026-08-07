import { fetchApi } from './apiClient';
import { DeploymentHistory, DeploymentEnvironment, InfrastructureTemplate } from '../../shared/types';

export const deploymentService = {
  getDeployments: async (): Promise<DeploymentHistory[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: DeploymentHistory[] }>('/developer-cloud/deployments/deployments');
      return res.data;
    } catch {
      return [
        { id: 'dep-101', targetId: 'tgt-k8s-prod', imageTag: 'cr.nexoapps.internal/api-gateway:v8.1.0-latest', status: 'success', deployedAt: new Date().toISOString() }
      ];
    }
  },

  getEnvironments: async (): Promise<DeploymentEnvironment[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: DeploymentEnvironment[] }>('/developer-cloud/deployments/environments');
      return res.data;
    } catch {
      return [
        { id: 'env-dev', orgId: 'org-dev-1', envName: 'Development', envType: 'development', createdAt: new Date().toISOString() },
        { id: 'env-stage', orgId: 'org-dev-1', envName: 'Staging Integration Sandbox', envType: 'staging', createdAt: new Date().toISOString() },
        { id: 'env-prod', orgId: 'org-dev-1', envName: 'Global Production Cloud', envType: 'production', createdAt: new Date().toISOString() }
      ];
    }
  },

  getIacTemplates: async (): Promise<InfrastructureTemplate[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: InfrastructureTemplate[] }>('/developer-cloud/deployments/iac-templates');
      return res.data;
    } catch {
      return [
        { id: 'tpl-1', templateName: 'HA Multi-Region EKS Cluster', provider: 'aws', iacType: 'terraform', templateBody: 'module "eks" { source = "terraform-aws-modules/eks/aws" }', createdAt: new Date().toISOString() },
        { id: 'tpl-2', templateName: 'GPU Inference Compute Node Pool', provider: 'gcp', iacType: 'terraform', templateBody: 'resource "google_container_node_pool" "gpu_nodes" {}', createdAt: new Date().toISOString() }
      ];
    }
  }
};
