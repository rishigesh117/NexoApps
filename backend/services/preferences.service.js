/**
 * User Preferences Sync Service
 * NexoApps Platform - Phase 5C
 */

class PreferencesService {
  constructor() {
    this.preferences = new Map();
    this.preferences.set('usr-1', {
      id: 'pref-1',
      userId: 'usr-1',
      theme: 'dark',
      language: 'en',
      notificationsEnabled: true,
      autoSync: true,
      autoBackup: false,
      dashboardLayout: { sidebar: 'expanded', density: 'comfortable' },
      updatedAt: new Date().toISOString(),
    });
  }

  getPreferences(userId) {
    return this.preferences.get(userId) || {
      id: `pref-${Date.now()}`,
      userId,
      theme: 'dark',
      language: 'en',
      notificationsEnabled: true,
      autoSync: true,
      autoBackup: false,
      dashboardLayout: {},
      updatedAt: new Date().toISOString(),
    };
  }

  updatePreferences(userId, updates) {
    const current = this.getPreferences(userId);
    const updated = { ...current, ...updates, updatedAt: new Date().toISOString() };
    this.preferences.set(userId, updated);
    return updated;
  }
}

module.exports = new PreferencesService();
