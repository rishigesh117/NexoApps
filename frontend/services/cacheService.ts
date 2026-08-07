import { CacheCluster, CacheNode } from '../../shared/types';

export const getCacheClusters = async (): Promise<{ clusters: CacheCluster[]; nodes: CacheNode[] }> => {
  return {
    clusters: [
      { id: 'cc-1', clusterName: 'Production Redis Cluster (Global)', clusterType: 'redis_cluster', status: 'healthy', nodesCount: 3, createdAt: new Date().toISOString() }
    ],
    nodes: [
      { id: 'cn-1', clusterId: 'cc-1', nodeName: 'redis-node-01', hostIp: '10.0.1.10', port: 6379, role: 'master', status: 'online' },
      { id: 'cn-2', clusterId: 'cc-1', nodeName: 'redis-node-02', hostIp: '10.0.1.11', port: 6379, role: 'replica', status: 'online' }
    ]
  };
};
