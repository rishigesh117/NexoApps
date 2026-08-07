/**
 * Database Dashboard Service — NexoApps Phase 12B (v9.2)
 * High-level database platform data aggregator.
 */

const clusterService = require('./database_cluster.service');
const replicationService = require('./replication.service');
const backupService = require('./backup.service');
const healthService = require('./database_health.service');

class DatabaseDashboardService {
  async getOverview() {
    const clusters = await clusterService.getClusters();
    const replication = await replicationService.getReplicationGroups();
    const backups = await backupService.getJobs();
    const health = await healthService.getHealthData();

    return {
      version: '9.2.0',
      status: 'resilient',
      clustersCount: clusters.length,
      replicationGroupsCount: replication.length,
      backupsCount: backups.length,
      health
    };
  }
}

module.exports = new DatabaseDashboardService();
