/**
 * Model Controller
 * NexoApps Platform - Phase 6C (Version 2.3)
 */

const modelService = require('../services/model.service');

exports.getModels = async (req, res, next) => {
  try {
    const models = modelService.getModels();
    return res.status(200).json({
      success: true,
      data: models,
    });
  } catch (err) {
    next(err);
  }
};

exports.registerModel = async (req, res, next) => {
  try {
    const model = modelService.registerModel(req.user?.id, req.body);
    return res.status(201).json({
      success: true,
      data: model,
    });
  } catch (err) {
    next(err);
  }
};
