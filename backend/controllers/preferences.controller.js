/**
 * Preferences Controller
 * NexoApps Platform - Phase 5C
 */

const preferencesService = require('../services/preferences.service');

exports.getPreferences = async (req, res, next) => {
  try {
    const prefs = preferencesService.getPreferences(req.user?.id || 'usr-1');
    return res.status(200).json({
      success: true,
      data: prefs,
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePreferences = async (req, res, next) => {
  try {
    const prefs = preferencesService.updatePreferences(req.user?.id || 'usr-1', req.body);
    return res.status(200).json({
      success: true,
      data: prefs,
    });
  } catch (err) {
    next(err);
  }
};
