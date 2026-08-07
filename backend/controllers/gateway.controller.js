/**
 * Gateway Controller — NexoApps Phase 9A
 * Unified gateway routing, health probes, fallback management, token telemetry, multimodal & speech capabilities.
 */

const modelRouterService = require('../services/model_router.service');
const tokenMeterService = require('../services/token_meter.service');
const providerHealthService = require('../services/provider_health.service');
const fallbackService = require('../services/fallback.service');
const multimodalService = require('../services/multimodal.service');
const imageGenerationService = require('../services/image_generation.service');
const speechService = require('../services/speech.service');

const gatewayController = {
  async routeModel(req, res) {
    try {
      const selectedModel = await modelRouterService.routeRequest(req.body);
      res.json({ success: true, data: selectedModel });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getModelComparison(req, res) {
    try {
      const metrics = await modelRouterService.getComparisonMetrics();
      res.json({ success: true, data: metrics });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getTokenAnalytics(req, res) {
    try {
      const analytics = await tokenMeterService.getTokenAnalytics();
      res.json({ success: true, data: analytics });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getProviderHealthGrid(req, res) {
    try {
      const health = await providerHealthService.getHealthGrid();
      res.json({ success: true, data: health });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getFallbackPolicies(req, res) {
    try {
      const policies = await fallbackService.listPolicies();
      res.json({ success: true, data: policies });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createFallbackPolicy(req, res) {
    try {
      const policy = await fallbackService.createPolicy(req.body);
      res.status(201).json({ success: true, data: policy });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async processMultimodal(req, res) {
    try {
      const request = await multimodalService.processRequest(req.body);
      res.json({ success: true, data: request });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async generateImage(req, res) {
    try {
      const image = await imageGenerationService.generateImage(req.body);
      res.json({ success: true, data: image });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async processSpeech(req, res) {
    try {
      const speech = await speechService.processSpeech(req.body);
      res.json({ success: true, data: speech });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async processTranslation(req, res) {
    try {
      const translation = await speechService.processTranslation(req.body);
      res.json({ success: true, data: translation });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = gatewayController;
