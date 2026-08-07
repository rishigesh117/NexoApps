/**
 * Replication Service — NexoApps Phase 12B (v9.2)
 * Streaming replication status and replica lag tracking.
 */

class DatabaseReplicationService {
  constructor() {
    this.groups = [
      { id: 'rg-1', groupName: 'prod-pg-streaming-group', primaryNodeId: 'dbn-1', replicationMode: 'streaming_async', status: 'active', createdAt: new Date().toISOString() }
    ];

    this.statuses = [
      { id: 'rs-1', groupId: 'rg-1', replicaNodeId: 'dbn-2', replicationLagMs: 1.2, status: 'in_sync', updatedAt: new Date().toISOString() },
      { id: 'rs-2', groupId: 'rg-1', replicaNodeId: 'dbn-3', replicationLagMs: 2.1, status: 'in_sync', updatedAt: new Date().toISOString() }
    ];
  }

  async getReplicationGroups() {
    return this.groups;
  }

  async getReplicationStatuses() {
    return this.statuses;
  }
}

module.exports = new DatabaseReplicationService();
