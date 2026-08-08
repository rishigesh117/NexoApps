/**
 * DNS Service — NexoApps Phase 12D (v9.4)
 * DNS zone management, record management (A, AAAA, CNAME, TXT, MX).
 */

class DnsService {
  constructor() {
    this.zones = [
      {
        id: 'dzone-1',
        zoneName: 'nexoapps.internal',
        zoneType: 'private',
        recordsCount: 4,
        status: 'active',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'dzone-2',
        zoneName: 'nexoapps.io',
        zoneType: 'public',
        recordsCount: 2,
        status: 'active',
        createdAt: new Date().toISOString(),
      },
    ];

    this.records = [
      {
        id: 'drec-1',
        zoneId: 'dzone-1',
        recordName: 'api.nexoapps.internal',
        recordType: 'A',
        recordValue: '10.0.10.12',
        ttl: 300,
        status: 'active',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'drec-2',
        zoneId: 'dzone-1',
        recordName: 'auth.nexoapps.internal',
        recordType: 'A',
        recordValue: '10.0.10.13',
        ttl: 300,
        status: 'active',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'drec-3',
        zoneId: 'dzone-1',
        recordName: 'db.nexoapps.internal',
        recordType: 'CNAME',
        recordValue: 'pg-primary.nexoapps.internal',
        ttl: 60,
        status: 'active',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  async getZones() {
    return this.zones;
  }

  async getRecords(zoneId) {
    if (zoneId) return this.records.filter((r) => r.zoneId === zoneId);
    return this.records;
  }

  async createZone(data) {
    const zone = {
      id: `dzone-${Date.now()}`,
      zoneName: data.zoneName,
      zoneType: data.zoneType || 'private',
      recordsCount: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    this.zones.push(zone);
    return zone;
  }

  async createRecord(data) {
    const record = {
      id: `drec-${Date.now()}`,
      zoneId: data.zoneId || 'dzone-1',
      recordName: data.recordName,
      recordType: data.recordType || 'A',
      recordValue: data.recordValue,
      ttl: Number(data.ttl) || 300,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    this.records.push(record);
    const z = this.zones.find((z) => z.id === record.zoneId);
    if (z) z.recordsCount += 1;
    return record;
  }
}

module.exports = new DnsService();
