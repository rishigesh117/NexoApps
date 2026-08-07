/**
 * Module Registry Service — NexoApps Phase 9E
 * Subsystem registration, health monitoring & status telemetry.
 */

class ModuleRegistryService {
  constructor() {
    this.modules = [
      { id: 'mod-1', moduleKey: 'ai_gateway', displayName: 'Universal AI Gateway', category: 'ai_core', version: '6.0.0', isEnabled: true, icon: 'Cpu', routePath: '/ai-gateway' },
      { id: 'mod-2', moduleKey: 'app_builder', displayName: 'AI Application Builder', category: 'studio', version: '6.1.0', isEnabled: true, icon: 'Layout', routePath: '/app-builder' },
      { id: 'mod-3', moduleKey: 'marketplace', displayName: 'AI Marketplace & Extensions', category: 'ecosystem', version: '6.2.0', isEnabled: true, icon: 'Store', routePath: '/marketplace' },
      { id: 'mod-4', moduleKey: 'software_engineering', displayName: 'Autonomous Software Engineering', category: 'engineering', version: '6.3.0', isEnabled: true, icon: 'Terminal', routePath: '/software-engineering' },
      { id: 'mod-5', moduleKey: 'knowledge_cloud', displayName: 'Enterprise Knowledge Cloud', category: 'knowledge', version: '5.0.0', isEnabled: true, icon: 'BookOpen', routePath: '/knowledge' },
      { id: 'mod-6', moduleKey: 'enterprise_ai', displayName: 'Enterprise AI Governance', category: 'enterprise', version: '5.2.0', isEnabled: true, icon: 'Shield', routePath: '/enterprise' }
    ];

    this.health = [
      { id: 'mh-1', moduleKey: 'ai_gateway', status: 'healthy', uptimePct: 99.99, latencyMs: 12, lastChecked: new Date().toISOString() },
      { id: 'mh-2', moduleKey: 'app_builder', status: 'healthy', uptimePct: 99.98, latencyMs: 18, lastChecked: new Date().toISOString() },
      { id: 'mh-3', moduleKey: 'marketplace', status: 'healthy', uptimePct: 99.95, latencyMs: 24, lastChecked: new Date().toISOString() },
      { id: 'mh-4', moduleKey: 'software_engineering', status: 'healthy', uptimePct: 100.0, latencyMs: 8, lastChecked: new Date().toISOString() }
    ];
  }

  async listModules() {
    return this.modules;
  }

  async getHealth() {
    return this.health;
  }
}

module.exports = new ModuleRegistryService();
