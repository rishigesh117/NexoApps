/**
 * License Service — NexoApps Phase 9C
 * Frontend API service for user license keys, activation, and entitlement management.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const licenseService = {
  async listLicenses() {
    const res = await fetch(`${API_BASE}/marketplace/extensions/licenses`);
    return res.json();
  },

  async generateLicense(itemId: string, licenseType = 'standard') {
    const res = await fetch(`${API_BASE}/marketplace/extensions/licenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId, licenseType }),
    });
    return res.json();
  },
};
