import { DnsZone, DnsRecord } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const dnsService = {
  async getZones(): Promise<DnsZone[]> {
    try {
      const res = await fetch(`${API_BASE}/networking/dns/zones`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'dzone-1', zoneName: 'nexoapps.internal', zoneType: 'private', recordsCount: 4, status: 'active', createdAt: new Date().toISOString() },
        { id: 'dzone-2', zoneName: 'nexoapps.io', zoneType: 'public', recordsCount: 2, status: 'active', createdAt: new Date().toISOString() },
      ];
    }
  },

  async getRecords(zoneId?: string): Promise<DnsRecord[]> {
    try {
      const query = zoneId ? `?zoneId=${zoneId}` : '';
      const res = await fetch(`${API_BASE}/networking/dns/records${query}`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'drec-1', zoneId: 'dzone-1', recordName: 'api.nexoapps.internal', recordType: 'A', recordValue: '10.0.10.12', ttl: 300, status: 'active', createdAt: new Date().toISOString() },
        { id: 'drec-2', zoneId: 'dzone-1', recordName: 'auth.nexoapps.internal', recordType: 'A', recordValue: '10.0.10.13', ttl: 300, status: 'active', createdAt: new Date().toISOString() },
      ];
    }
  },
};
