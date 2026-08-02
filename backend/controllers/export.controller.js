/**
 * Export Controller
 * NexoApps Platform - Phase 6A (Version 2.1)
 */

const exportService = require('../services/export.service');

exports.createExportPackage = async (req, res, next) => {
  try {
    const { projectId, exportFormat } = req.body;
    const pkg = exportService.createExportPackage(projectId || 'aip-101', exportFormat);
    return res.status(201).json({
      success: true,
      data: pkg,
    });
  } catch (err) {
    next(err);
  }
};
