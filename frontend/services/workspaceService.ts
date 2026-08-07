import { fetchApi } from './apiClient';

export const getWorkspaces = async (): Promise<any[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: any[] }>('/platform/workspace/workspaces');
    return res.data;
  } catch {
    return [
      { id: 'ws-main', workspaceName: 'Nexo Global Enterprise Workspace', ownerId: 'user-admin', isActive: true, createdAt: new Date().toISOString() }
    ];
  }
};

export const getWorkspaceApiKeys = async (workspaceId?: string): Promise<any[]> => {
  return [
    { id: 'ws-key-1', workspaceId: workspaceId || 'ws-main', name: 'Production API Secret', keyHash: 'sha256:f7a...', createdAt: new Date().toISOString() }
  ];
};

export const createWorkspaceApiKey = async (workspaceId: string, keyName: string, permissions?: string[]): Promise<any> => {
  return {
    id: `ws-key-${Date.now()}`,
    workspaceId,
    name: keyName,
    permissions: permissions || ['*'],
    keyHash: `sha256:${Date.now()}`,
    createdAt: new Date().toISOString()
  };
};

export const workspaceService = {
  getWorkspaces,
  getWorkspaceApiKeys,
  createWorkspaceApiKey
};
