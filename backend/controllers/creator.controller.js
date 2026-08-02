/**
 * Creator Controller
 * NexoApps Platform - Phase 6D (Version 2.4)
 */

const creatorService = require('../services/creator.service');
const payoutService = require('../services/payout.service');

exports.getCreators = async (req, res, next) => {
  try {
    const creators = creatorService.getCreators();
    return res.status(200).json({
      success: true,
      data: creators,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCreatorByUsername = async (req, res, next) => {
  try {
    const creator = creatorService.getCreatorByUsername(req.params.username);
    return res.status(200).json({
      success: true,
      data: creator,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPayouts = async (req, res, next) => {
  try {
    const payouts = payoutService.getPayouts(req.user?.id);
    return res.status(200).json({
      success: true,
      data: payouts,
    });
  } catch (err) {
    next(err);
  }
};
