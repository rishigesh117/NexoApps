/**
 * Compute Controller — NexoApps Phase 10B
 */

const computeService = require('../services/compute.service');

class ComputeController {
  async getClusters(req, res) {
    try {
      const clusters = await computeService.getClusters();
      res.json({ success: true, data: clusters });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getVirtualMachines(req, res) {
    try {
      const vms = await computeService.getVirtualMachines();
      res.json({ success: true, data: vms });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async launchVM(req, res) {
    try {
      const vm = await computeService.launchVM(req.body);
      res.json({ success: true, data: vm });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new ComputeController();
