/**
 * AI Search Controller
 * NexoApps Platform - Phase 5A
 */

const searchEngineService = require('../services/search_engine.service');
const recommendationV2Service = require('../services/recommendation_v2.service');
const searchHistoryService = require('../services/search_history.service');

exports.globalSearch = async (req, res, next) => {
  try {
    const { q, category, sort, rating, downloads, platform, page, limit } = req.query;

    if (q) {
      searchHistoryService.recordSearch(q, req.user?.id);
    }

    const result = searchEngineService.globalSearch(q, {
      category,
      sort,
      rating,
      downloads,
      platform,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 12,
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

exports.getRecommendations = async (req, res, next) => {
  try {
    const userId = req.user?.id || 'guest';
    const recs = recommendationV2Service.getPersonalizedRecommendations(userId);
    return res.status(200).json({
      success: true,
      data: recs,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPopularSearches = async (req, res, next) => {
  try {
    const popular = searchHistoryService.getPopularSearches();
    return res.status(200).json({
      success: true,
      data: popular,
    });
  } catch (err) {
    next(err);
  }
};
