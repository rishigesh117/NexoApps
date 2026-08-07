/**
 * Failover Service — NexoApps Phase 12B (v9.2)
 * High-availability automatic primary failover and leader election events.
 */

class DatabaseFailoverService {
  constructor() {
    this.events = [
      { id: 'fo-1', clusterId: 'dbc-1', oldPrimaryId: 'dbn-3', newPrimaryId: 'dbn-1', failoverReason: 'Automatic leader election promotion (Patroni HA)', triggeredAt: new Date().toISOString() }
    ];
  }

  async getFailoverEvents() {
    return this.events;
  }
}

module.exports = new DatabaseFailoverService();
