/**
 * OAuth Controller
 * NexoApps Platform - Phase 7B (Version 3.1)
 */

const oauthService = require('../services/oauth.service');

exports.getApplications = async (req, res, next) => {
  try {
    const apps = oauthService.getApplications();
    return res.status(200).json({
      success: true,
      data: apps,
    });
  } catch (err) {
    next(err);
  }
};
