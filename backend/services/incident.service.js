/**
 * Incident Service — NexoApps Phase 12C (v9.3)
 * Manage operational incidents and complete lifecycle:
 * DETECTED -> ACKNOWLEDGED -> INVESTIGATING -> MITIGATING -> RESOLVED -> CLOSED
 */

class IncidentService {
  constructor() {
    this.incidents = [
      {
        id: 'inc-901',
        title: 'AI Reasoning Engine Degradation & Latency Spike',
        description: 'Increased 5xx error rate and high p95 latency observed on AI Reasoning Engine workers following v9.2 runtime update.',
        severity: 'SEV2',
        status: 'INVESTIGATING',
        assignedTo: 'user_sre_lead_01',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        resolvedAt: null,
      },
      {
        id: 'inc-902',
        title: 'Redis Cluster Primary Failover Event',
        description: 'Automatic failover triggered on global cache cluster cc-1 due to transient network partition.',
        severity: 'SEV3',
        status: 'RESOLVED',
        assignedTo: 'user_devops_02',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        resolvedAt: new Date(Date.now() - 82800000).toISOString(),
      },
    ];

    this.events = [
      {
        id: 'ievt-1',
        incidentId: 'inc-901',
        eventType: 'state_change',
        note: 'Incident status updated from DETECTED to ACKNOWLEDGED',
        createdBy: 'user_sre_lead_01',
        createdAt: new Date(Date.now() - 3300000).toISOString(),
      },
      {
        id: 'ievt-2',
        incidentId: 'inc-901',
        eventType: 'note_added',
        note: 'Linked alert event aevt-1 (High HTTP Error Rate Spike). Investigating ONNX worker memory buffers.',
        createdBy: 'user_sre_lead_01',
        createdAt: new Date(Date.now() - 2700000).toISOString(),
      },
      {
        id: 'ievt-3',
        incidentId: 'inc-901',
        eventType: 'state_change',
        note: 'Status transitioned to INVESTIGATING.',
        createdBy: 'user_sre_lead_01',
        createdAt: new Date(Date.now() - 2400000).toISOString(),
      },
    ];

    this.assignments = [
      { id: 'iassign-1', incidentId: 'inc-901', assigneeId: 'user_sre_lead_01', role: 'lead_responder', assignedAt: new Date(Date.now() - 3300000).toISOString() },
      { id: 'iassign-2', incidentId: 'inc-901', assigneeId: 'user_devops_02', role: 'secondary_responder', assignedAt: new Date(Date.now() - 3000000).toISOString() },
    ];
  }

  async getIncidents() {
    return this.incidents;
  }

  async getIncidentById(id) {
    const incident = this.incidents.find((i) => i.id === id);
    if (!incident) return null;

    const timeline = this.events.filter((e) => e.incidentId === id).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const assignments = this.assignments.filter((a) => a.incidentId === id);

    return {
      ...incident,
      timeline,
      assignments,
    };
  }

  async createIncident(data) {
    const newIncident = {
      id: `inc-${Math.floor(1000 + Math.random() * 9000)}`,
      title: data.title,
      description: data.description || '',
      severity: data.severity || 'SEV3',
      status: 'DETECTED',
      assignedTo: data.assignedTo || null,
      createdAt: new Date().toISOString(),
      resolvedAt: null,
    };
    this.incidents.push(newIncident);

    // Record initial event
    this.events.push({
      id: `ievt-${Date.now()}`,
      incidentId: newIncident.id,
      eventType: 'state_change',
      note: 'Incident detected and initialized',
      createdBy: data.createdBy || 'system',
      createdAt: new Date().toISOString(),
    });

    if (data.assignedTo) {
      this.assignments.push({
        id: `iassign-${Date.now()}`,
        incidentId: newIncident.id,
        assigneeId: data.assignedTo,
        role: 'lead_responder',
        assignedAt: new Date().toISOString(),
      });
    }

    return newIncident;
  }

  async updateIncidentStatus(id, newStatus, note, user) {
    const incident = this.incidents.find((i) => i.id === id);
    if (!incident) return null;

    incident.status = newStatus;
    if (['RESOLVED', 'CLOSED'].includes(newStatus) && !incident.resolvedAt) {
      incident.resolvedAt = new Date().toISOString();
    }

    this.events.push({
      id: `ievt-${Date.now()}`,
      incidentId: id,
      eventType: 'state_change',
      note: note || `Status updated to ${newStatus}`,
      createdBy: user || 'system',
      createdAt: new Date().toISOString(),
    });

    return incident;
  }

  async addTimelineNote(id, note, user) {
    const event = {
      id: `ievt-${Date.now()}`,
      incidentId: id,
      eventType: 'note_added',
      note,
      createdBy: user || 'system',
      createdAt: new Date().toISOString(),
    };
    this.events.push(event);
    return event;
  }
}

module.exports = new IncidentService();
