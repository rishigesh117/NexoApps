/**
 * Data Source Service — NexoApps Phase 10C
 * Manages enterprise data connectors, databases, data lakes, and stream sources.
 */

class DataSourceService {
  constructor() {
    this.sources = [
      { id: 'ds-101', name: 'Enterprise PostgreSQL Cluster', sourceType: 'postgres', connectionUrl: 'postgresql://db.nexoapps.internal:5432/analytics', status: 'connected', lastSyncedAt: new Date().toISOString(), createdAt: new Date().toISOString() },
      { id: 'ds-102', name: 'Snowflake Enterprise Warehouse', sourceType: 'snowflake', connectionUrl: 'snowflake://nexo.snowflakecomputing.com', status: 'connected', lastSyncedAt: new Date().toISOString(), createdAt: new Date().toISOString() },
      { id: 'ds-103', name: 'Real-Time Apache Kafka Cluster', sourceType: 'kafka', connectionUrl: 'kafka://stream.nexoapps.internal:9092', status: 'connected', lastSyncedAt: new Date().toISOString(), createdAt: new Date().toISOString() }
    ];
  }

  async getDataSources() {
    return this.sources;
  }

  async addDataSource(sourceData) {
    const ds = {
      id: `ds-${Date.now()}`,
      name: sourceData.name || 'New Data Source',
      sourceType: sourceData.sourceType || 'postgres',
      connectionUrl: sourceData.connectionUrl || 'postgresql://localhost:5432/db',
      status: 'connected',
      lastSyncedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    this.sources.push(ds);
    return ds;
  }
}

module.exports = new DataSourceService();
