/**
 * Plugin Installation Service — NexoApps Phase 9C
 * Installed plugins per user/organization, permission toggles & update checks.
 */

const { v4: uuidv4 } = require('uuid');

class PluginInstallationService {
  constructor() {
    this.installations = [
      { id: 'inst-1', pluginId: 'plug-1', userId: 'user-owner', status: 'active', installedVersion: '1.4.0', installedAt: new Date().toISOString() },
      { id: 'inst-2', pluginId: 'plug-2', userId: 'user-owner', status: 'active', installedVersion: '2.0.1', installedAt: new Date().toISOString() }
    ];
  }

  async listInstallations(userId) {
    if (userId) return this.installations.filter(i => i.userId === userId || i.userId === 'user-owner');
    return this.installations;
  }

  async installPlugin(pluginId, userId) {
    let inst = this.installations.find(i => i.pluginId === pluginId && i.userId === userId);
    if (!inst) {
      inst = {
        id: `inst-${uuidv4().substring(0, 8)}`,
        pluginId,
        userId,
        status: 'active',
        installedVersion: '1.0.0',
        installedAt: new Date().toISOString()
      };
      this.installations.push(inst);
    }
    return inst;
  }
}

module.exports = new PluginInstallationService();
