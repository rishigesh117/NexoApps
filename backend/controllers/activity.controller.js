/**
 * Activity Controller
 * NexoApps Platform - Phase 6E (Version 2.5)
 */

const activityFeedService = require('../services/activity_feed.service');

exports.getActivityFeed = async (req, res, next) => {
  try {
    const feed = activityFeedService.getActivityFeed();
    return res.status(200).json({
      success: true,
      data: feed,
    });
  } catch (err) {
    next(err);
  }
};
