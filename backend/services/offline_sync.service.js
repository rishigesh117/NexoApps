/**
 * Offline Sync Queue Service
 * NexoApps Platform - Phase 5C
 */

class OfflineSyncService {
  constructor() {
    this.queue = [];
    this.conflicts = [];
  }

  enqueueChange(userId, change) {
    const entry = {
      id: `off-${Date.now()}`,
      userId,
      deviceId: change.deviceId || null,
      entityType: change.entityType,
      entityId: change.entityId,
      action: change.action,
      payload: change.payload || {},
      synced: false,
      createdAt: new Date().toISOString(),
    };
    this.queue.push(entry);
    return entry;
  }

  getPendingChanges(userId) {
    return this.queue.filter((q) => q.userId === userId && !q.synced);
  }

  syncAll(userId) {
    const pending = this.getPendingChanges(userId);
    pending.forEach((p) => { p.synced = true; });
    return { syncedCount: pending.length, timestamp: new Date().toISOString() };
  }

  getConflicts(userId) {
    return this.conflicts.filter((c) => c.userId === userId && c.resolution === 'pending');
  }

  resolveConflict(conflictId, resolution) {
    const conflict = this.conflicts.find((c) => c.id === conflictId);
    if (!conflict) throw new Error('Conflict not found');
    conflict.resolution = resolution;
    return conflict;
  }
}

module.exports = new OfflineSyncService();
