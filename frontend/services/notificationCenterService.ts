/**
 * Notification Center Service — NexoApps Phase 9E
 * Frontend API service for system notifications and alerts.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const notificationCenterService = {
  async listNotifications() {
    const res = await fetch(`${API_BASE}/ai-os/workspace/notifications`);
    return res.json();
  },
};
