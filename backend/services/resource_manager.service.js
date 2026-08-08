/**
 * Resource Manager Service — NexoApps Phase 12E (v9.5)
 */

class ResourceManagerService {
  constructor() {
    this.capacityEntries = [
      { id: 'rcap-1', regionId: 'creg-1', totalCpuCores: 2500, usedCpuCores: 1120, totalMemoryGb: 10000, usedMemoryGb: 4400, updatedAt: new Date().toISOString() },
      { id: 'rcap-2', regionId: 'creg-2', totalCpuCores: 1800, usedCpuCores: 820, totalMemoryGb: 7200, usedMemoryGb: 3100, updatedAt: new Date().toISOString() },
    ];
  }

  async getCapacity(regionId) {
    if (regionId) return this.capacityEntries.filter((c) => c.regionId === regionId);
    return this.capacityEntries;
  }
}

module.exports = new ResourceManagerService();
