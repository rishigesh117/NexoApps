/**
 * Synthetic Monitor Service — NexoApps Phase 12C (v9.3)
 * Support synthetic endpoint and multi-step workflow monitoring.
 */

class SyntheticMonitorService {
  constructor() {
    this.monitors = [
      {
        id: 'synth-1',
        monitorName: 'User Authentication & JWT Session Flow',
        scriptType: 'http_scenario',
        frequencyMinutes: 5,
        status: 'active',
        successRatePct: 99.9,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'synth-2',
        monitorName: 'AI Model Inference Prompt Pipeline Test',
        scriptType: 'playwright_browser',
        frequencyMinutes: 15,
        status: 'active',
        successRatePct: 98.5,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'synth-3',
        monitorName: 'Database Platform Backup Trigger & Status Verification',
        scriptType: 'api_workflow',
        frequencyMinutes: 30,
        status: 'active',
        successRatePct: 100.0,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  async getMonitors() {
    return this.monitors;
  }

  async createMonitor(data) {
    const monitor = {
      id: `synth-${Date.now()}`,
      monitorName: data.monitorName,
      scriptType: data.scriptType || 'http_scenario',
      frequencyMinutes: Number(data.frequencyMinutes) || 5,
      status: 'active',
      successRatePct: 100.0,
      createdAt: new Date().toISOString(),
    };
    this.monitors.push(monitor);
    return monitor;
  }
}

module.exports = new SyntheticMonitorService();
