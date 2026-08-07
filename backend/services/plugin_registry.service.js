/**
 * Plugin Registry Service — NexoApps Phase 9C
 * Global plugin registry, entrypoint verification, and security permissions.
 */

const { v4: uuidv4 } = require('uuid');

class PluginRegistryService {
  constructor() {
    this.plugins = [
      { id: 'plug-1', name: 'Vector RAG Connector Plugin', pluginKey: 'vector-rag-connector', description: 'Pinecone & PGVector query plugin', version: '1.4.0', entrypointFile: 'index.js', isOfficial: true, createdAt: new Date().toISOString() },
      { id: 'plug-2', name: 'GitHub Automated Pull Request Plugin', pluginKey: 'github-pr-auditor', description: 'Diff analysis & vulnerability reporting plugin', version: '2.0.1', entrypointFile: 'main.js', isOfficial: true, createdAt: new Date().toISOString() }
    ];

    this.permissions = [
      { id: 'perm-1', pluginId: 'plug-1', permissionName: 'network_access' },
      { id: 'perm-2', pluginId: 'plug-1', permissionName: 'storage_access' },
      { id: 'perm-3', pluginId: 'plug-2', permissionName: 'gateway_routing' }
    ];
  }

  async listPlugins() {
    return this.plugins;
  }

  async registerPlugin(data) {
    const plugin = {
      id: `plug-${uuidv4().substring(0, 8)}`,
      name: data.name,
      pluginKey: data.pluginKey || data.name.toLowerCase().replace(/\s+/g, '-'),
      description: data.description || '',
      version: data.version || '1.0.0',
      entrypointFile: data.entrypointFile || 'index.js',
      isOfficial: data.isOfficial !== undefined ? data.isOfficial : true,
      createdAt: new Date().toISOString()
    };
    this.plugins.push(plugin);
    return plugin;
  }
}

module.exports = new PluginRegistryService();
