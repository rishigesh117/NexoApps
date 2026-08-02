/**
 * Developer API Service
 * NexoApps Platform - Phase 7B (Version 3.1)
 */

class DeveloperApiService {
  getApiKeys() {
    return [
      {
        id: 'key-1',
        applicationId: 'app-1',
        apiKey: 'nx_live_84920482910482019482901',
        name: 'Production Server Key',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ];
  }
}

module.exports = new DeveloperApiService();
