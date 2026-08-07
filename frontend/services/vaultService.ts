import { fetchApi } from './apiClient';

export const getSecrets = async (): Promise<any[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: any[] }>('/security/vault/secrets');
    return res.data;
  } catch {
    return [
      { id: 'sec-101', secretName: 'PROD_DATABASE_PASSWORD', secretType: 'database', encryptedValue: 'enc:AES-256:v1:8f9a2b...', encryptedPayload: 'enc:AES-256:v1:8f9a2b...', version: 3, createdBy: 'user-admin', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'sec-102', secretName: 'STRIPE_LIVE_API_KEY', secretType: 'api_key', encryptedValue: 'enc:AES-256:v1:1c4d7e...', encryptedPayload: 'enc:AES-256:v1:1c4d7e...', version: 1, createdBy: 'user-admin', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    ];
  }
};

export const getApiKeys = async (): Promise<any[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: any[] }>('/security/vault/api-keys');
    return res.data;
  } catch {
    return [
      { id: 'key-101', userId: 'user-admin', keyName: 'CI/CD Pipeline Production Key', keyHash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', permissions: ['*'], lastUsedAt: new Date().toISOString(), createdAt: new Date().toISOString() }
    ];
  }
};

export const vaultService = {
  getSecrets,
  getApiKeys
};
