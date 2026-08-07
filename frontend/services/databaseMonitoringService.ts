import { DatabaseConnection, DatabaseHealth } from '../../shared/types';

export const getDatabaseHealthData = async (): Promise<{ connections: DatabaseConnection[]; health: DatabaseHealth[] }> => {
  return {
    connections: [
      { id: 'dc-1', clusterId: 'dbc-1', activeConnections: 45, maxConnections: 500, idleConnections: 15, recordedAt: new Date().toISOString() }
    ],
    health: [
      { id: 'dbh-1', clusterId: 'dbc-1', cpuUtilizationPct: 24.5, memoryUtilizationPct: 48.2, diskUtilizationPct: 32.1, healthScore: 100, recordedAt: new Date().toISOString() }
    ]
  };
};
