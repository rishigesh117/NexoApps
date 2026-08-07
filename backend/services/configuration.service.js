/**
 * Configuration Service — NexoApps Phase 10E (v8.0)
 * Global environment configurations, feature flags, and system parameters.
 */

class ConfigurationService {
  constructor() {
    this.configs = [
      { id: 'cfg-1', configKey: 'SYSTEM_NAME', configValue: 'NexoApps AI Hyper Platform', category: 'general', updatedAt: new Date().toISOString() },
      { id: 'cfg-2', configKey: 'VERSION_LTS', configValue: '8.0.0', category: 'release', updatedAt: new Date().toISOString() }
    ];
  }

  async getConfigs() {
    return this.configs;
  }
}

module.exports = new ConfigurationService();
