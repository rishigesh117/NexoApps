/**
 * Cloud Region Service — NexoApps Phase 12E (v9.5)
 */

class CloudRegionService {
  constructor() {
    this.regions = [
      { id: 'creg-1', providerId: 'cprov-aws', regionCode: 'us-east-1', regionName: 'US East (N. Virginia)', locationLat: 38.9489, locationLng: -77.4481, status: 'operational', isActive: true, createdAt: new Date().toISOString() },
      { id: 'creg-2', providerId: 'cprov-aws', regionCode: 'eu-central-1', regionName: 'Europe (Frankfurt)', locationLat: 50.1109, locationLng: 8.6821, status: 'operational', isActive: true, createdAt: new Date().toISOString() },
      { id: 'creg-3', providerId: 'cprov-gcp', regionCode: 'asia-south1', regionName: 'Asia Pacific (Mumbai)', locationLat: 19.0760, locationLng: 72.8777, status: 'operational', isActive: true, createdAt: new Date().toISOString() },
    ];

    this.zones = [
      { id: 'czone-1', regionId: 'creg-1', zoneCode: 'us-east-1a', zoneName: 'US East 1A', status: 'available', createdAt: new Date().toISOString() },
      { id: 'czone-2', regionId: 'creg-1', zoneCode: 'us-east-1b', zoneName: 'US East 1B', status: 'available', createdAt: new Date().toISOString() },
      { id: 'czone-3', regionId: 'creg-2', zoneCode: 'eu-central-1a', zoneName: 'EU Central 1A', status: 'available', createdAt: new Date().toISOString() },
    ];
  }

  async getRegions() {
    return this.regions;
  }

  async getZones(regionId) {
    if (regionId) return this.zones.filter((z) => z.regionId === regionId);
    return this.zones;
  }

  async createRegion(data) {
    const reg = {
      id: `creg-${Date.now()}`,
      providerId: data.providerId || 'cprov-aws',
      regionCode: data.regionCode,
      regionName: data.regionName,
      locationLat: Number(data.locationLat) || 0.0,
      locationLng: Number(data.locationLng) || 0.0,
      status: 'operational',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    this.regions.push(reg);
    return reg;
  }
}

module.exports = new CloudRegionService();
