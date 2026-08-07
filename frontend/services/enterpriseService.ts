import { fetchApi } from './apiClient';
import { EnterpriseRegistry, EnterpriseModule, EnterpriseService, EnterpriseWorkflow } from '../../shared/types';

export const getEnterpriseOverview = async (): Promise<{ registry: EnterpriseRegistry; modules: EnterpriseModule[]; services: EnterpriseService[] }> => {
  try {
    const res = await fetchApi<{ success: boolean; data: any }>('/enterprise/core/overview');
    return res.data;
  } catch {
    return {
      registry: {
        id: 'ent-reg-01',
        enterpriseName: 'NexoApps Global AI Enterprise Universe',
        licenseTier: 'unlimited_enterprise',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      modules: [
        { id: 'mod-1', moduleName: 'AI Operating System', moduleKey: 'ai_os', category: 'core', version: '9.0.0', isEnabled: true, createdAt: new Date().toISOString() },
        { id: 'mod-2', moduleName: 'AI Collaboration Platform', moduleKey: 'collaboration', category: 'workspace', version: '9.0.0', isEnabled: true, createdAt: new Date().toISOString() },
        { id: 'mod-3', moduleName: 'AI Developer Cloud', moduleKey: 'developer_cloud', category: 'engineering', version: '9.0.0', isEnabled: true, createdAt: new Date().toISOString() },
        { id: 'mod-4', moduleName: 'AI ModelOps Platform', moduleKey: 'modelops', category: 'ai', version: '9.0.0', isEnabled: true, createdAt: new Date().toISOString() },
        { id: 'mod-5', moduleName: 'AI Enterprise Automation', moduleKey: 'automation', category: 'process', version: '9.0.0', isEnabled: true, createdAt: new Date().toISOString() }
      ],
      services: [
        { id: 'srv-1', serviceName: 'AI Core Router Engine', serviceType: 'core_ai', status: 'healthy', createdAt: new Date().toISOString() },
        { id: 'srv-2', serviceName: 'Enterprise Workflow Engine', serviceType: 'automation', status: 'healthy', createdAt: new Date().toISOString() }
      ]
    };
  }
};

export const getEnterpriseWorkflows = async (): Promise<EnterpriseWorkflow[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: EnterpriseWorkflow[] }>('/enterprise/core/workflows');
    return res.data;
  } catch {
    return [
      {
        id: 'wf-ent-1',
        workflowName: 'Autonomous CI/CD & ModelOps Sync Pipeline',
        description: 'End-to-end automation from code push to ModelOps deployment',
        status: 'active',
        createdAt: new Date().toISOString()
      }
    ];
  }
};

export const enterpriseService = {
  getEnterpriseOverview,
  getEnterpriseWorkflows
};
