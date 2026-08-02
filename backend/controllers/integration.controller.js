/**
 * Integration Controller
 * NexoApps Platform - Phase 7B (Version 3.1)
 */

const integrationService = require('../services/integration.service');
const integrationMonitorService = require('../services/integration_monitor.service');

exports.getProviders = async (req, res, next) => {
  try {
    const providers = integrationService.getProviders();
    const logs = integrationMonitorService.getLogs();
    return res.status(200).json({
      success: true,
      data: { providers, logs },
    });
  } catch (err) {
    next(err);
  }
};
