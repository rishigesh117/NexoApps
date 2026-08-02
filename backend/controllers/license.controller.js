/**
 * License Controller
 * NexoApps Platform - Phase 6D (Version 2.4)
 */

const licenseService = require('../services/license.service');

exports.getLicense = async (req, res, next) => {
  try {
    const license = licenseService.getLicenseForItem(req.params.itemId);
    return res.status(200).json({
      success: true,
      data: license,
    });
  } catch (err) {
    next(err);
  }
};
