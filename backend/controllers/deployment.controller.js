/**
 * Deployment Controller
 * NexoApps Platform - Phase 5E (Version 2.0 EC1)
 */

const deploymentService = require('../services/deployment.service');

exports.getDeployments = async (req, res, next) => {
  try {
    const deployments = deploymentService.getDeployments();
    return res.status(200).json({
      success: true,
      data: deployments,
    });
  } catch (err) {
    next(err);
  }
};
