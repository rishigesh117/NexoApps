/**
 * Preferences Synchronization Service
 * NexoApps Platform - Phase 5C
 */

class PreferencesService {
  constructor() {
    this.preferences = new Map();
  }

  getPreferences(userId) {
    if (!this.preferences.has(userId)) {
      this.preferences.set(userId, {
        userId,
        theme: 'dark',
        language: 'en',
        emailNotifications: true,
        pushNotifications: true,
        autoBackup: true,
        syncFavorites: true,
        syncCollections: true,
        updatedAt: new Date().toISOString(),
      });
    }
    return this.preferences.get(userId);
  }

  updatePreferences(userId, patch) {
    const current = this.getPreferences(userId);
    const updated = { ...current, ...patch, updatedAt: new Date().toISOString() };
    this.preferences.set(userId, updated);
    return updated;
  }
}

module.exports = new PreferencesService();
