/**
 * Device Management Service
 * NexoApps Platform - Phase 5C
 */

class DeviceService {
  constructor() {
    this.devices = [
      {
        id: 'dev-1',
        userId: 'usr-1',
        deviceName: 'Pixel 8 Pro (Primary Android)',
        deviceType: 'Android Phone',
        os: 'Android 14',
        browser: 'Chrome Mobile 126',
        ipAddress: '192.168.1.45',
        isCurrentDevice: false,
        lastActiveAt: new Date(Date.now() - 3600000).toISOString(),
        createdAt: new Date(Date.now() - 864000000).toISOString(),
      },
      {
        id: 'dev-2',
        userId: 'usr-1',
        deviceName: 'MacBook Pro 16" (Development Workstation)',
        deviceType: 'Desktop Browser',
        os: 'macOS Sonoma',
        browser: 'Chrome 126.0',
        ipAddress: '127.0.0.1',
        isCurrentDevice: true,
        lastActiveAt: new Date().toISOString(),
        createdAt: new Date(Date.now() - 1728000000).toISOString(),
      },
    ];
  }

  getDevices(userId) {
    return this.devices;
  }

  removeDevice(deviceId) {
    this.devices = this.devices.filter((d) => d.id !== deviceId);
    return true;
  }
}

module.exports = new DeviceService();
