/**
 * Notification Queue & Dead Letter Queue (DLQ) Service
 * NexoApps Platform - Phase 5E (Version 2.0 EC1)
 */

class NotificationQueueService {
  getQueueStatus() {
    return {
      emailQueueCount: 0,
      pushQueueCount: 0,
      retryQueueCount: 0,
      deadLetterQueueCount: 0,
      workersActive: 4,
    };
  }
}

module.exports = new NotificationQueueService();
