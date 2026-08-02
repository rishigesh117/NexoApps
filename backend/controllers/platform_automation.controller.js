/**
 * Platform Automation Controller
 * NexoApps Platform - Phase 6E (Version 2.5)
 */

const automationRulesService = require('../services/automation_rules.service');

exports.getRules = async (req, res, next) => {
  try {
    const rules = automationRulesService.getRules();
    return res.status(200).json({
      success: true,
      data: rules,
    });
  } catch (err) {
    next(err);
  }
};
