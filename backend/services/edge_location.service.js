/**
 * Edge Location Service — NexoApps Phase 12D (v9.4)
 * Edge POP location management, regional health, edge node tracking.
 */

class EdgeLocationService {
  constructor() {
    this.locations = [
      {
        id: 'eloc-1',
        locationCode: 'US-EAST-IAD',
        locationName: 'North America East (Ashburn)',
        region: 'us-east-1',
        status: 'operational',
        latencyMs: 8.5,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'eloc-2',
        locationCode: 'EU-WEST-FRA',
        locationName: 'Europe Central (Frankfurt)',
        region: 'eu-central-1',
        status: 'operational',
        latencyMs: 14.2,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'eloc-3',
        locationCode: 'AP-SOUTH-BOM',
        locationName: 'Asia Pacific (Mumbai)',
        region: 'ap-south-1',
        status: 'operational',
        latencyMs: 22.0,
        createdAt: new Date().toISOString(),
      },
    ];

    this.nodes = [
      {
        id: 'enode-1',
        edgeLocationId: 'eloc-1',
        nodeName: 'iad-edge-01.nexoapps.net',
        publicIp: '198.51.100.10',
        status: 'online',
        requestsPerSec: 1250.0,
        lastHeartbeat: new Date().toISOString(),
      },
      {
        id: 'enode-2',
        edgeLocationId: 'eloc-2',
        nodeName: 'fra-edge-01.nexoapps.net',
        publicIp: '198.51.100.20',
        status: 'online',
        requestsPerSec: 890.0,
        lastHeartbeat: new Date().toISOString(),
      },
    ];
  }

  async getLocations() {
    return this.locations;
  }

  async getNodes(locationId) {
    if (locationId) return this.nodes.filter((n) => n.edgeLocationId === locationId);
    return this.nodes;
  }

  async createLocation(data) {
    const loc = {
      id: `eloc-${Date.now()}`,
      locationCode: data.locationCode,
      locationName: data.locationName,
      region: data.region || 'us-east-1',
      status: 'operational',
      latencyMs: Number(data.latencyMs) || 15.0,
      createdAt: new Date().toISOString(),
    };
    this.locations.push(loc);
    return loc;
  }
}

module.exports = new EdgeLocationService();
