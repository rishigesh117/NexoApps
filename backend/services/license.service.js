/**
 * License Service — NexoApps Phase 10A
 * Generates digital license keys, device activation management, and verification.
 */

class LicenseService {
  constructor() {
    this.licenses = [
      {
        id: 'lic-101',
        productId: 'prod-101',
        userId: 'user-admin',
        licenseKey: 'NXO-PRO-889A-442F-990B-7711',
        licenseType: 'commercial',
        maxActivations: 5,
        currentActivations: 2,
        status: 'active',
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString()
      }
    ];
  }

  async getUserLicenses(userId = 'user-admin') {
    return this.licenses.filter(l => l.userId === userId);
  }

  async verifyLicense(key) {
    const lic = this.licenses.find(l => l.licenseKey === key);
    if (!lic) return { valid: false, message: 'License key not found' };
    if (lic.status !== 'active') return { valid: false, message: 'License is inactive or revoked' };
    return { valid: true, license: lic };
  }

  async activateDevice(key, deviceId) {
    const lic = this.licenses.find(l => l.licenseKey === key);
    if (!lic) throw new Error('License key not found');
    if (lic.currentActivations >= lic.maxActivations) {
      throw new Error('Maximum activation limit reached');
    }
    lic.currentActivations += 1;
    return { success: true, currentActivations: lic.currentActivations, maxActivations: lic.maxActivations };
  }
}

module.exports = new LicenseService();
