/**
 * Tracing Controller — NexoApps Phase 12C (v9.3)
 */

const tracingService = require('../services/tracing.service');

class TracingController {
  async getServices(req, res) {
    try {
      const services = await tracingService.getServices();
      res.json({ success: true, data: services });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getTraces(req, res) {
    try {
      const traces = await tracingService.getTraces(req.query.limit);
      res.json({ success: true, data: traces });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getTraceById(req, res) {
    try {
      const trace = await tracingService.getTraceById(req.params.id);
      if (!trace) {
        return res.status(404).json({ success: false, error: 'Trace not found' });
      }
      res.json({ success: true, data: trace });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async ingestSpan(req, res) {
    try {
      const span = await tracingService.ingestSpan(req.body);
      res.status(201).json({ success: true, data: span });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new TracingController();
