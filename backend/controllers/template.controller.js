/**
 * Template Controller
 * NexoApps Platform - Phase 6A (Version 2.1)
 */

const templateService = require('../services/template.service');

exports.getTemplates = async (req, res, next) => {
  try {
    const templates = templateService.getTemplates();
    return res.status(200).json({
      success: true,
      data: templates,
    });
  } catch (err) {
    next(err);
  }
};
