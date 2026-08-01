/**
 * Device Management Service
 * NexoApps Platform - Phase 5C
 */

class DeviceService {
  constructor() {
    this.devices = [
      {
        id: 'dev-chrome-win',
        userId: 'usr-1',
        deviceName: 'Windows 11 — Chrome Desktop',
        deviceType: 'desktop',
        browser: 'Chrome 126',
        operatingSystem: 'Windows 11 Pro',
        ipAddress: '192.168.1.100',
        isCurrent: true,
        lastActive: new Date().toISOString(),
        createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
      },
      {
        id: 'dev-pixel-8',
        userId: 'usr-1',
        deviceName: 'Pixel 8 Pro — Android 15',
        deviceType: 'phone',
        browser: 'Chrome Mobile 126',
        operatingSystem: 'Android 15',
        ipAddress: '192.168.1.105',
        isCurrent: false,
        lastActive: new Date(Date.now() - 3600000 * 2).toISOString(),
        createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
      },
    ];
  }

  getDevices(userId) {
    return this.devices.filter((d) => d.userId === userId || d.userId === 'usr-1');
  }

  registerDevice(userId, data) {
    const device = {
      id: `dev-${Date.now()}`,
      userId,
      deviceName: data.deviceName || 'Unknown Device',
      deviceType: data.deviceType || 'desktop',
      browser: data.browser || 'Unknown',
      operatingSystem: data.operatingSystem || 'Unknown',
      ipAddress: data.ipAddress || '',
      isCurrent: true,
      lastActive: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    this.devices.unshift(device);
    return device;
  }

  renameDevice(deviceId, newName) {
    const device = this.devices.find((d) => d.id === deviceId);
    if (!device) throw new Error('Device not found');
    device.deviceName = newName;
    return device;
  }

  removeDevice(deviceId) {
    const idx = this.devices.findIndex((d) => d.id === deviceId);
    if (idx === -1) throw new Error('Device not found');
    this.devices.splice(idx, 1);
    return { success: true };
  }
}

module.exports = new DeviceService();
