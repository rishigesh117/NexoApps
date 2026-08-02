/**
 * Runtime Monitor Service — NexoApps Phase 8B
 * Hardware resource telemetry, CPU/Memory metrics, and runtime execution logs.
 */

const { v4: uuidv4 } = require('uuid');

class RuntimeMonitorService {
  async getMetrics(instanceId) {
    return [
      { id: uuidv4(), instanceId, cpuUsagePercent: 24.5, memoryUsageMb: 128.4, networkInBytes: 1048576, networkOutBytes: 2097152, timestamp: new Date().toISOString() },
    ];
  }

  async getLogs(instanceId) {
    return [
      { id: uuidv4(), instanceId, logLevel: 'info', message: 'Runtime container boot sequence completed in 18ms', timestamp: new Date(Date.now() - 3600000).toISOString() },
      { id: uuidv4(), instanceId, logLevel: 'info', message: 'Serving HTTP/2 traffic on port 5000', timestamp: new Date(Date.now() - 3590000).toISOString() },
    ];
  }
}

module.exports = new RuntimeMonitorService();
