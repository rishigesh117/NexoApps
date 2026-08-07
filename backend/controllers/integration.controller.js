/**
 * Integration Controller
 * NexoApps Platform - Version 8.3 (Phase 11C)
 */

const integrationService = require('../services/integration.service');
const integrationMonitorService = require('../services/integration_monitor.service');
const integrationHubService = require('../services/integration_hub.service');

// Legacy export
exports.getProviders = async (req, res, next) => {
  try {
    const providers = integrationService.getProviders();
    const logs = integrationMonitorService.getLogs();
    return res.status(200).json({ success: true, data: { providers, logs } });
  } catch (err) {
    next(err);
  }
};

// Phase 11C Extensions
exports.listIntegrations = async (req, res) => {
  try {
    const integrations = await integrationHubService.listIntegrations();
    res.json({ success: true, data: integrations });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createIntegration = async (req, res) => {
  try {
    const integration = await integrationHubService.createIntegration(req.body);
    res.status(201).json({ success: true, data: integration });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listConnections = async (req, res) => {
  try {
    const connections = await integrationHubService.listConnections(req.params.id);
    res.json({ success: true, data: connections });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.testConnection = async (req, res) => {
  try {
    const result = await integrationHubService.testConnection(req.params.connectionId);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
