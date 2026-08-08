/**
 * Incident Controller — NexoApps Phase 12C (v9.3)
 */

const incidentService = require('../services/incident.service');

class IncidentController {
  async getIncidents(req, res) {
    try {
      const incidents = await incidentService.getIncidents();
      res.json({ success: true, data: incidents });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getIncidentById(req, res) {
    try {
      const incident = await incidentService.getIncidentById(req.params.id);
      if (!incident) {
        return res.status(404).json({ success: false, error: 'Incident record not found' });
      }
      res.json({ success: true, data: incident });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createIncident(req, res) {
    try {
      const { title } = req.body;
      if (!title) {
        return res.status(400).json({ success: false, error: 'Incident title is required' });
      }
      const incident = await incidentService.createIncident(req.body);
      res.status(201).json({ success: true, data: incident });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async updateIncident(req, res) {
    try {
      const { status, note, user } = req.body;
      if (!status) {
        return res.status(400).json({ success: false, error: 'Status is required' });
      }
      const updated = await incidentService.updateIncidentStatus(req.params.id, status, note, user);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Incident record not found' });
      }
      res.json({ success: true, data: updated });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async addNote(req, res) {
    try {
      const { note, user } = req.body;
      if (!note) {
        return res.status(400).json({ success: false, error: 'Note text is required' });
      }
      const event = await incidentService.addTimelineNote(req.params.id, note, user);
      res.status(201).json({ success: true, data: event });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new IncidentController();
