/**
 * Storage Cluster Service — NexoApps Phase 12B (v9.2)
 * Distributed Ceph/Rook storage cluster nodes and volume replication.
 */

class DistributedStorageClusterService {
  constructor() {
    this.clusters = [
      { id: 'sc-1', clusterName: 'Production Ceph Distributed Storage Pool', storageType: 'distributed_ceph', totalCapacityGb: 10000.0, usedCapacityGb: 1200.0, status: 'healthy', createdAt: new Date().toISOString() }
    ];

    this.nodes = [
      { id: 'sn-1', clusterId: 'sc-1', nodeName: 'ceph-osd-01', capacityGb: 2500.0, status: 'online' },
      { id: 'sn-2', clusterId: 'sc-1', nodeName: 'ceph-osd-02', capacityGb: 2500.0, status: 'online' }
    ];
  }

  async getStorageClusters() {
    return this.clusters;
  }

  async getStorageNodes() {
    return this.nodes;
  }
}

module.exports = new DistributedStorageClusterService();
