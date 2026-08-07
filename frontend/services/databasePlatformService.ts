import { DatabaseCluster, DatabaseNode, DatabaseHealth, QueryStatistic, DisasterRecoverySite } from '../../shared/types';

export const getDatabasePlatformOverview = async () => {
  return {
    version: '9.2.0',
    status: 'resilient',
    clustersCount: 1,
    replicationGroupsCount: 1,
    backupsCount: 1,
    health: [
      { id: 'dbh-1', clusterId: 'dbc-1', cpuUtilizationPct: 24.5, memoryUtilizationPct: 48.2, diskUtilizationPct: 32.1, healthScore: 100, recordedAt: new Date().toISOString() }
    ] as DatabaseHealth[]
  };
};

export const getDatabaseClusters = async (): Promise<{ clusters: DatabaseCluster[]; nodes: DatabaseNode[] }> => {
  return {
    clusters: [
      { id: 'dbc-1', clusterName: 'PostgreSQL Enterprise Cluster (Primary)', engineType: 'postgresql', version: '16.2', status: 'healthy', nodesCount: 3, createdAt: new Date().toISOString() }
    ],
    nodes: [
      { id: 'dbn-1', clusterId: 'dbc-1', nodeName: 'pg-primary-node-01', hostIp: '10.0.3.10', port: 5432, role: 'primary', status: 'online' },
      { id: 'dbn-2', clusterId: 'dbc-1', nodeName: 'pg-replica-node-02', hostIp: '10.0.3.11', port: 5432, role: 'replica', status: 'online' },
      { id: 'dbn-3', clusterId: 'dbc-1', nodeName: 'pg-replica-node-03', hostIp: '10.0.3.12', port: 5432, role: 'replica', status: 'online' }
    ]
  };
};

export const getQueryAnalytics = async (): Promise<QueryStatistic[]> => {
  return [
    { id: 'qs-1', clusterId: 'dbc-1', queryHash: 'e4f7a901', queryText: 'SELECT * FROM users WHERE tenant_id = $1 AND is_active = true;', callsCount: 145000, totalExecTimeMs: 1450.0, meanExecTimeMs: 0.01 }
  ];
};

export const getDisasterRecoverySites = async (): Promise<DisasterRecoverySite[]> => {
  return [
    { id: 'drs-1', siteName: 'AWS us-west-2 Secondary DR Standby', region: 'us-west-2', status: 'standby', createdAt: new Date().toISOString() }
  ];
};
