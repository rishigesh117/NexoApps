import { StorageCluster, StorageNode } from '../../shared/types';

export const getStorageClusters = async (): Promise<{ clusters: StorageCluster[]; nodes: StorageNode[] }> => {
  return {
    clusters: [
      { id: 'sc-1', clusterName: 'Production Ceph Distributed Storage Pool', storageType: 'distributed_ceph', totalCapacityGb: 10000.0, usedCapacityGb: 1200.0, status: 'healthy', createdAt: new Date().toISOString() }
    ],
    nodes: [
      { id: 'sn-1', clusterId: 'sc-1', nodeName: 'ceph-osd-01', capacityGb: 2500.0, status: 'online' },
      { id: 'sn-2', clusterId: 'sc-1', nodeName: 'ceph-osd-02', capacityGb: 2500.0, status: 'online' }
    ]
  };
};
