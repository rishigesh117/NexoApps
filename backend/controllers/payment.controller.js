/**
 * Payment Controller — NexoApps Phase 10A
 */

const paymentService = require('../services/payment.service');

class PaymentController {
  async getGateways(req, res) {
    try {
      const gateways = await paymentService.getGateways();
      res.json({ success: true, data: gateways });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async processPayment(req, res) {
    try {
      const payment = await paymentService.processPayment(req.body);
      res.json({ success: true, data: payment });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new PaymentController();
