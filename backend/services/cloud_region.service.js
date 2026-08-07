/**
 * Cloud Region Service — NexoApps Phase 10B
 * Global cloud region deployment and availability zone orchestration.
 */

class CloudRegionService {
  constructor() {
    this.regions = [
      { id: 'reg-1', name: 'US East (N. Virginia)', code: 'us-east-1', location: 'Northern Virginia, USA', isActive: true, createdAt: new Date().toISOString() },
      { id: 'reg-2', name: 'Europe West (Frankfurt)', code: 'eu-west-1', location: 'Frankfurt, Germany', isActive: true, createdAt: new Date().toISOString() },
      { id: 'reg-3', name: 'Asia Pacific (Tokyo)', code: 'ap-northeast-1', location: 'Tokyo, Japan', isActive: true, createdAt: new Date().toISOString() }
    ];
  }

  async getRegions() {
    return this.regions;
  }
}

module.exports = new CloudRegionService();
