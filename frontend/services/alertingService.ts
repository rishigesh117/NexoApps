import { AlertRule, AlertEvent } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const alertingService = {
  async getRules(): Promise<AlertRule[]> {
    try {
      const res = await fetch(`${API_BASE}/observability/alerts/rules`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'arule-1', name: 'High CPU Utilization (>85%)', severity: 'warning', isEnabled: true, cooldownMinutes: 15, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 'arule-2', name: 'High HTTP Error Rate (>5%)', severity: 'critical', isEnabled: true, cooldownMinutes: 10, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 'arule-3', name: 'Service Unavailability Emergency', severity: 'emergency', isEnabled: true, cooldownMinutes: 5, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ];
    }
  },

  async getEvents(): Promise<AlertEvent[]> {
    try {
      const res = await fetch(`${API_BASE}/observability/alerts/events`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'aevt-1', ruleId: 'arule-2', title: 'High HTTP Error Rate Spike on AI Reasoning Engine', message: 'Error rate 5.8% > threshold 5.0%', severity: 'critical', status: 'triggered', triggeredAt: new Date().toISOString() },
      ];
    }
  },

  async acknowledgeEvent(eventId: string) {
    try {
      const res = await fetch(`${API_BASE}/observability/alerts/events/${eventId}/acknowledge`, { method: 'PUT' });
      const json = await res.json();
      return json.data;
    } catch (err) {
      return null;
    }
  },

  async resolveEvent(eventId: string) {
    try {
      const res = await fetch(`${API_BASE}/observability/alerts/events/${eventId}/resolve`, { method: 'PUT' });
      const json = await res.json();
      return json.data;
    } catch (err) {
      return null;
    }
  },
};
