/**
 * API Key Service — NexoApps Phase 10D
 * Scoped API key management, rate limits, and key rotation.
 */

class ApiKeyService {
  constructor() {
    this.apiKeys = [
      { id: 'key-101', userId: 'user-admin', keyName: 'CI/CD Pipeline Production Key', keyHash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', permissions: ['*'], lastUsedAt: new Date().toISOString(), createdAt: new Date().toISOString() }
    ];
  }

  async getApiKeys() {
    return this.apiKeys;
  }
}

module.exports = new ApiKeyService();
