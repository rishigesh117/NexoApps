/**
 * Environment Service — NexoApps Phase 7D
 * Environment profiles and environment variable configuration.
 */

const { v4: uuidv4 } = require('uuid');

class EnvironmentService {
  async listProfiles(tenantId) {
    return [
      { id: uuidv4(), tenantId, name: 'Production Profile', environmentType: 'production', description: 'Production workload environment profile', isDefault: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: uuidv4(), tenantId, name: 'Staging Profile', environmentType: 'staging', description: 'Staging and QA test environment', isDefault: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: uuidv4(), tenantId, name: 'Development Profile', environmentType: 'development', description: 'Local development and sandboxing', isDefault: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ];
  }

  async createProfile(data) {
    return { id: uuidv4(), ...data, isDefault: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  }

  async listVariables(profileId) {
    return [
      { id: uuidv4(), profileId, varKey: 'NODE_ENV', varValue: 'production', isSensitive: false, createdAt: new Date().toISOString() },
      { id: uuidv4(), profileId, varKey: 'DATABASE_URL', varValue: 'postgres://***:***@db.nexoapps.internal/prod', isSensitive: true, createdAt: new Date().toISOString() },
      { id: uuidv4(), profileId, varKey: 'REDIS_URL', varValue: 'redis://redis.nexoapps.internal:6379', isSensitive: false, createdAt: new Date().toISOString() },
      { id: uuidv4(), profileId, varKey: 'API_TIMEOUT_MS', varValue: '30000', isSensitive: false, createdAt: new Date().toISOString() },
    ];
  }

  async addVariable(profileId, data) {
    return { id: uuidv4(), profileId, ...data, createdAt: new Date().toISOString() };
  }
}

module.exports = new EnvironmentService();
