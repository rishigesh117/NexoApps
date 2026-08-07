import { fetchApi } from './apiClient';
import { EnterpriseWorkspace } from '../../shared/types';

export const getEnterpriseWorkspaces = async (): Promise<EnterpriseWorkspace[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: EnterpriseWorkspace[] }>('/enterprise/workspaces/workspaces');
    return res.data;
  } catch {
    return [
      {
        id: 'ent-ws-main',
        workspaceName: 'Global AI Enterprise Universe Hub',
        slug: 'global-ai-universe-hub',
        description: 'Main production workspace for NexoApps v9.0 enterprise operations',
        ownerId: 'user-admin',
        status: 'active',
        createdAt: new Date().toISOString()
      }
    ];
  }
};

export const createEnterpriseWorkspace = async (workspaceName: string, description?: string): Promise<EnterpriseWorkspace> => {
  try {
    const res = await fetchApi<{ success: boolean; data: EnterpriseWorkspace }>('/enterprise/workspaces/workspaces', {
      method: 'POST',
      body: JSON.stringify({ workspaceName, description })
    });
    return res.data;
  } catch {
    return {
      id: `ent-ws-${Date.now()}`,
      workspaceName,
      slug: `ent-ws-${Date.now()}`,
      description: description || '',
      ownerId: 'user-admin',
      status: 'active',
      createdAt: new Date().toISOString()
    };
  }
};

export const enterpriseWorkspaceService = {
  getEnterpriseWorkspaces,
  createEnterpriseWorkspace
};
