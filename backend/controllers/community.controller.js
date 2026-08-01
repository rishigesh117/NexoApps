/**
 * Community Controller Layer
 * NexoApps Platform - Phase 4D
 */

const communityService = require('../services/community.service');
const trendingService = require('../services/trending.service');
const recommendationService = require('../services/recommendation.service');
const appService = require('../services/app.service');

class CommunityController {
  // GET /api/v1/community/trending
  getTrending(req, res) {
    try {
      const { period } = req.query;
      const list = trendingService.getTrendingApps(period || 'today');
      return res.status(200).json({ success: true, data: list });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // GET /api/v1/community/recommended
  getRecommended(req, res) {
    try {
      const user = req.user;
      const list = recommendationService.getPersonalizedRecommendations(user);
      return res.status(200).json({ success: true, data: list });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // GET /api/v1/community/latest
  getLatest(req, res) {
    try {
      const list = appService.getAllApps().slice(0, 8);
      return res.status(200).json({ success: true, data: list });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // GET /api/v1/community/editors-choice
  getEditorsChoice(req, res) {
    try {
      const list = appService.getAllApps().filter((a) => a.isEditorsChoice || a.isFeatured);
      return res.status(200).json({ success: true, data: list });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // GET /api/v1/community/feed
  getFeed(req, res) {
    try {
      const feed = communityService.getActivityFeed();
      return res.status(200).json({ success: true, data: feed });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }
}

module.exports = new CommunityController();
