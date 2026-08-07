/**
 * Replication Controller — NexoApps Phase 12B (v9.2)
 */

const replicationService = require('../services/replication.service');
const failoverService = require('../services/failover.service');

class DatabaseReplicationController {
  async getReplication(req, res) {
    try {
      const groups = await replicationService.getReplicationGroups();
      const statuses = await replicationService.getReplicationStatuses();
      const failovers = await failoverService.getFailoverEvents();
      res.json({ success: true, data: { groups, statuses, failovers } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new DatabaseReplicationController();
