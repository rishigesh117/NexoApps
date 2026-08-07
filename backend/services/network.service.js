/**
 * Network Service — NexoApps Phase 10B
 * Virtual private networks (VNET), subnets, firewall rules, and VPC isolation.
 */

class NetworkService {
  constructor() {
    this.vnets = [
      { id: 'vnet-101', tenantId: 'tnt-enterprise-01', regionId: 'reg-1', name: 'NexoMainVNET', cidrBlock: '10.0.0.0/16', status: 'active', createdAt: new Date().toISOString() }
    ];
    this.subnets = [
      { id: 'sub-1', vnetId: 'vnet-101', zoneId: 'zone-1a', name: 'Public-Subnet-A', cidrBlock: '10.0.1.0/24', isPublic: true },
      { id: 'sub-2', vnetId: 'vnet-101', zoneId: 'zone-1b', name: 'Private-Compute-Subnet', cidrBlock: '10.0.2.0/24', isPublic: false }
    ];
  }

  async getVnets(tenantId = 'tnt-enterprise-01') {
    return this.vnets.filter(v => v.tenantId === tenantId);
  }

  async getSubnets(vnetId) {
    return this.subnets.filter(s => s.vnetId === vnetId);
  }
}

module.exports = new NetworkService();
