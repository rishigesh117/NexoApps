/**
 * Dataset Controller
 * NexoApps Platform - Phase 6C (Version 2.3)
 */

const datasetService = require('../services/dataset.service');

exports.getDatasets = async (req, res, next) => {
  try {
    const datasets = datasetService.getDatasets();
    return res.status(200).json({
      success: true,
      data: datasets,
    });
  } catch (err) {
    next(err);
  }
};

exports.createDataset = async (req, res, next) => {
  try {
    const dataset = datasetService.createDataset(req.user?.id, req.body);
    return res.status(201).json({
      success: true,
      data: dataset,
    });
  } catch (err) {
    next(err);
  }
};
