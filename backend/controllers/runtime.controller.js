/**
 * AI Runtime Controller
 * NexoApps Platform — Version 5.1 (Extended for Phase 8B)
 */

const runtimeService = require('../services/runtime.service');
const runtimeManagerService = require('../services/runtime_manager.service');
const serverlessService = require('../services/serverless.service');
const containerService = require('../services/container.service');

exports.getRuntimeTelemetry = async (req, res, next) => {
  try {
    const telemetry = runtimeService.getTelemetry();
    return res.status(200).json({
      success: true,
      data: telemetry,
    });
  } catch (err) {
    next(err);
  }
};

// ─── Phase 8B Extensions ───

exports.listEnvironments = async (req, res) => {
  try {
    const environments = await runtimeManagerService.listEnvironments(req.query.tenantId || 'default');
    res.json({ success: true, data: environments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getEnvironment = async (req, res) => {
  try {
    const environment = await runtimeManagerService.getEnvironment(req.params.id);
    res.json({ success: true, data: environment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createEnvironment = async (req, res) => {
  try {
    const environment = await runtimeManagerService.createEnvironment(req.body);
    res.status(201).json({ success: true, data: environment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listInstances = async (req, res) => {
  try {
    const instances = await runtimeManagerService.listInstances(req.params.id);
    res.json({ success: true, data: instances });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.invokeFunction = async (req, res) => {
  try {
    const result = await serverlessService.invokeFunction(req.params.id, req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listContainers = async (req, res) => {
  try {
    const containers = await containerService.listContainers(req.params.instanceId);
    res.json({ success: true, data: containers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listImages = async (req, res) => {
  try {
    const images = await containerService.listImages();
    res.json({ success: true, data: images });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
