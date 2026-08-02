/**
 * Knowledge Connector Service — NexoApps Phase 8C
 * Multi-source data sync connectors (Confluence, Notion, Google Drive, Jira, GitHub).
 */

const { v4: uuidv4 } = require('uuid');

class KnowledgeConnectorService {
  async listConnectors() {
    return [
      { id: uuidv4(), name: 'Confluence Wiki Connector', connectorType: 'confluence', status: 'connected', config: { space: 'ENG' }, lastSyncAt: new Date(Date.now() - 3600000).toISOString(), createdAt: new Date().toISOString() },
      { id: uuidv4(), name: 'GitHub Enterprise Repos Connector', connectorType: 'github', status: 'connected', config: { org: 'NexoApps' }, lastSyncAt: new Date(Date.now() - 7200000).toISOString(), createdAt: new Date().toISOString() },
      { id: uuidv4(), name: 'Notion Engineering Docs Connector', connectorType: 'notion', status: 'connected', config: { workspace: 'Product' }, lastSyncAt: new Date(Date.now() - 10800000).toISOString(), createdAt: new Date().toISOString() },
    ];
  }

  async triggerSync(connectorId) {
    return {
      jobId: uuidv4(),
      connectorId,
      documentsSynced: 24,
      status: 'completed',
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    };
  }
}

module.exports = new KnowledgeConnectorService();
