/**
 * Offline Sync Queue Service
 * NexoApps Platform - Phase 5C
 */

class OfflineSyncService {
  constructor() {
    this.queue = [];
  }

  enqueueChange(userId, actionType, payload) {
    const item = {
      id: `off-${Date.now()}`,
      userId,
      actionType,
      payload,
      synced: false,
      createdAt: new Date().toISOString(),
    };
    this.queue.push(item);
    return item;
  }

  processQueue(userId) {
    const userItems = this.queue.filter((i) => i.userId === userId && !i.synced);
    userItems.forEach((i) => (i.synced = true));
    return {
      processedCount: userItems.length,
      timestamp: new Date().toISOString(),
    };
  }
}

module.exports = new OfflineSyncService();
