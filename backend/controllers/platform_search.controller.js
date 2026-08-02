/**
 * Platform Search Controller
 * NexoApps Platform - Phase 6E (Version 2.5)
 */

const platformSearchService = require('../services/platform_search.service');

exports.search = async (req, res, next) => {
  try {
    const { q } = req.query;
    const results = platformSearchService.search(q);
    return res.status(200).json({
      success: true,
      data: results,
    });
  } catch (err) {
    next(err);
  }
};
