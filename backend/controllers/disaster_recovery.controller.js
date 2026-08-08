/**
 * Disaster Recovery Controller — NexoApps Phase 12E (v9.5)
 */

const globalDisasterRecoveryService = require('../services/global_disaster_recovery.service');

class DisasterRecoveryController {
  async getPlans(req, res) {
    try {
      const plans = await globalDisasterRecoveryService.getPlans();
      res.json({ success: true, data: plans });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getExecutions(req, res) {
    try {
      const executions = await globalDisasterRecoveryService.getExecutions(req.query.planId);
      res.json({ success: true, data: executions });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async triggerDrill(req, res) {
    try {
      const { planId } = req.body;
      const ex = await globalDisasterRecoveryService.triggerDrill(planId);
      res.status(201).json({ success: true, data: ex });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new DisasterRecoveryController();
