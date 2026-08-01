/**
 * User Preferences Controller
 * NexoApps Platform - Phase 5C
 */

const preferencesService = require('../services/preferences.service');

exports.getPreferences = async (req, res, next) => {
  try {
    const userId = req.user?.id || 'usr-1';
    const prefs = preferencesService.getPreferences(userId);
    return res.status(200).json({ success: true, data: prefs });
  } catch (err) { next(err); }
};

exports.updatePreferences = async (req, res, next) => {
  try {
    const userId = req.user?.id || 'usr-1';
    const updated = preferencesService.updatePreferences(userId, req.body);
    return res.status(200).json({ success: true, data: updated });
  } catch (err) { next(err); }
};
