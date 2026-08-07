/**
 * Engineering Controller — NexoApps Phase 9D
 * Controls Architecture, Database Design, API Studio, Code Review & Security.
 */

const architectureService = require('../services/architecture.service');
const databaseDesignerService = require('../services/database_designer.service');
const apiDesignerService = require('../services/api_designer.service');
const codeReviewService = require('../services/code_review.service');
const securityScanService = require('../services/security_scan.service');
const documentationService = require('../services/documentation.service');
const dependencyAnalysisService = require('../services/dependency_analysis.service');
const bugTrackingService = require('../services/bug_tracking.service');
const releasePipelineService = require('../services/release_pipeline.service');
const engineeringMetricsService = require('../services/engineering_metrics.service');

const engineeringController = {
  async getArchitecture(req, res) {
    try {
      const arch = await architectureService.getDesign(req.params.id);
      res.json({ success: true, data: arch });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getDatabaseDesign(req, res) {
    try {
      const db = await databaseDesignerService.getDesign(req.params.id);
      res.json({ success: true, data: db });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getApiSpec(req, res) {
    try {
      const spec = await apiDesignerService.getSpec(req.params.id);
      res.json({ success: true, data: spec });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getCodeReview(req, res) {
    try {
      const review = await codeReviewService.reviewBranch(req.params.id, req.query.branch);
      res.json({ success: true, data: review });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getSecurityScan(req, res) {
    try {
      const scan = await securityScanService.runScan(req.params.id);
      res.json({ success: true, data: scan });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getDocumentation(req, res) {
    try {
      const docs = await documentationService.getDocs(req.params.id);
      res.json({ success: true, data: docs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getDependencies(req, res) {
    try {
      const deps = await dependencyAnalysisService.getGraph(req.params.id);
      res.json({ success: true, data: deps });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listBugs(req, res) {
    try {
      const bugs = await bugTrackingService.listBugs(req.params.id);
      res.json({ success: true, data: bugs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getPipelines(req, res) {
    try {
      const pipes = await releasePipelineService.getPipelines(req.params.id);
      res.json({ success: true, data: pipes });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getMetrics(req, res) {
    try {
      const metrics = await engineeringMetricsService.getMetrics(req.params.id);
      res.json({ success: true, data: metrics });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = engineeringController;
