/**
 * Experiment Controller
 * NexoApps Platform - Phase 6C (Version 2.3)
 */

const experimentService = require('../services/experiment.service');

exports.getExperiments = async (req, res, next) => {
  try {
    const data = experimentService.getExperiments();
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};
