/**
 * Webhook Controller
 * NexoApps Platform - Phase 7B (Version 3.1)
 */

const webhookService = require('../services/webhook.service');

exports.getWebhooks = async (req, res, next) => {
  try {
    const webhooks = webhookService.getWebhooks();
    return res.status(200).json({
      success: true,
      data: webhooks,
    });
  } catch (err) {
    next(err);
  }
};
