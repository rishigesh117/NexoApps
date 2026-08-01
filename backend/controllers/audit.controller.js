/**
 * Audit Log Controller
 * NexoApps Platform - Phase 5E (Version 2.0 EC1)
 */

const auditLogService = require('../services/audit_log.service');

exports.getAuditLogs = async (req, res, next) => {
  try {
    const logs = auditLogService.getAuditLogs();
    return res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (err) {
    next(err);
  }
};
