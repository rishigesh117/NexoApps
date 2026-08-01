/**
 * Platform Automation Controller
 * NexoApps Platform - Phase 5B
 */

const automationService = require('../services/automation.service');

exports.getLogs = async (req, res, next) => {
  try {
    const logs = automationService.getLogs();
    return res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAuditReport = async (req, res, next) => {
  try {
    const report = automationService.runDiagnosticAudit();
    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (err) {
    next(err);
  }
};
