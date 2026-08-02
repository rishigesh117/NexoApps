/**
 * AI Deployment Controller
 * NexoApps Platform - Phase 6C (Version 2.3)
 */

const aiDeploymentService = require('../services/ai_deployment.service');
const inferenceService = require('../services/inference.service');

exports.getDeployments = async (req, res, next) => {
  try {
    const deployments = aiDeploymentService.getDeployments();
    const endpointKeys = aiDeploymentService.getEndpointKeys(req.user?.id);
    return res.status(200).json({
      success: true,
      data: { deployments, endpointKeys },
    });
  } catch (err) {
    next(err);
  }
};

exports.deployModel = async (req, res, next) => {
  try {
    const { modelId, versionId, environment } = req.body;
    const deployment = aiDeploymentService.deployModel(modelId, versionId, environment);
    return res.status(201).json({
      success: true,
      data: deployment,
    });
  } catch (err) {
    next(err);
  }
};

exports.runInference = async (req, res, next) => {
  try {
    const { modelSlug, prompt, maxTokens, temperature } = req.body;
    const result = inferenceService.runInference(modelSlug, prompt, maxTokens, temperature);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
