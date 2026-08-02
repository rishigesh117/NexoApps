/**
 * AI Runtime Controller
 * NexoApps Platform - Phase 6C (Version 2.3)
 */

const runtimeService = require('../services/runtime.service');

exports.getRuntimeTelemetry = async (req, res, next) => {
  try {
    const telemetry = runtimeService.getTelemetry();
    return res.status(200).json({
      success: true,
      data: telemetry,
    });
  } catch (err) {
    next(err);
  }
};
