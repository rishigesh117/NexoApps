/**
 * Integration Monitor Service
 * NexoApps Platform - Phase 7B (Version 3.1)
 */

class IntegrationMonitorService {
  getLogs() {
    return [
      { id: 'log-1', accountId: 'acc-1', action: 'GITHUB_SYNC', status: 'SUCCESS', details: 'Synced 14 commits to repo main', timestamp: new Date().toISOString() },
      { id: 'log-2', accountId: 'acc-2', action: 'STRIPE_WEBHOOK', status: 'SUCCESS', details: 'Processed invoice.payment_succeeded', timestamp: new Date(Date.now() - 3600000).toISOString() },
    ];
  }
}

module.exports = new IntegrationMonitorService();
