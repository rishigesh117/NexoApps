import { CloudRegion, CloudZone, RegionHealth, RegionCapacity } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const cloudRegionService = {
  async getRegions(): Promise<CloudRegion[]> {
    try {
      const res = await fetch(`${API_BASE}/cloud-control/regions`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'creg-1', providerId: 'cprov-aws', regionCode: 'us-east-1', regionName: 'US East (N. Virginia)', locationLat: 38.9489, locationLng: -77.4481, status: 'operational', isActive: true, createdAt: new Date().toISOString() },
        { id: 'creg-2', providerId: 'cprov-aws', regionCode: 'eu-central-1', regionName: 'Europe (Frankfurt)', locationLat: 50.1109, locationLng: 8.6821, status: 'operational', isActive: true, createdAt: new Date().toISOString() },
        { id: 'creg-3', providerId: 'cprov-gcp', regionCode: 'asia-south1', regionName: 'Asia Pacific (Mumbai)', locationLat: 19.0760, locationLng: 72.8777, status: 'operational', isActive: true, createdAt: new Date().toISOString() },
      ];
    }
  },

  async getZones(regionId?: string): Promise<CloudZone[]> {
    try {
      const query = regionId ? `?regionId=${regionId}` : '';
      const res = await fetch(`${API_BASE}/cloud-control/regions/zones${query}`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'czone-1', regionId: 'creg-1', zoneCode: 'us-east-1a', zoneName: 'US East 1A', status: 'available', createdAt: new Date().toISOString() },
        { id: 'czone-2', regionId: 'creg-1', zoneCode: 'us-east-1b', zoneName: 'US East 1B', status: 'available', createdAt: new Date().toISOString() },
      ];
    }
  },

  async getHealth(): Promise<RegionHealth[]> {
    try {
      const res = await fetch(`${API_BASE}/cloud-control/regions/health`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'rh-1', regionId: 'creg-1', status: 'healthy', latencyP95Ms: 8.5, errorRatePct: 0.0, recordedAt: new Date().toISOString() },
        { id: 'rh-2', regionId: 'creg-2', status: 'healthy', latencyP95Ms: 14.2, errorRatePct: 0.01, recordedAt: new Date().toISOString() },
      ];
    }
  },
};
