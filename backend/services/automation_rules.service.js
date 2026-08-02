/**
 * Cross-Module Automation Rules Service
 * NexoApps Platform - Phase 6E (Version 2.5)
 */

class AutomationRulesService {
  constructor() {
    this.rules = [
      {
        id: 'rule-1',
        userId: 'usr-1',
        name: 'Auto-Deploy AI Model on Code Review Pass',
        triggerEvent: 'AGENT_REVIEW_PASSED',
        actionTarget: 'DEPLOY_MODEL_STAGING',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'rule-2',
        userId: 'usr-1',
        name: 'Auto-Publish Template to Marketplace on Export',
        triggerEvent: 'BUILDER_EXPORT_SUCCESS',
        actionTarget: 'CREATE_MARKETPLACE_DRAFT',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  getRules() {
    return this.rules;
  }
}

module.exports = new AutomationRulesService();
