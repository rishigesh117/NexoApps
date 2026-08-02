/**
 * Knowledge Controller — NexoApps Phase 8C
 */

const knowledgeBaseService = require('../services/knowledge_base.service');
const documentProcessingService = require('../services/document_processing.service');
const vectorStoreService = require('../services/vector_store.service');
const semanticSearchService = require('../services/semantic_search.service');
const knowledgeAnalyticsService = require('../services/knowledge_analytics.service');

const knowledgeController = {
  async listBases(req, res) {
    try {
      const bases = await knowledgeBaseService.listBases(req.query.tenantId || 'default');
      res.json({ success: true, data: bases });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getBase(req, res) {
    try {
      const base = await knowledgeBaseService.getBase(req.params.id);
      res.json({ success: true, data: base });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createBase(req, res) {
    try {
      const base = await knowledgeBaseService.createBase(req.body);
      res.status(201).json({ success: true, data: base });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listDocuments(req, res) {
    try {
      const docs = await documentProcessingService.listDocuments(req.params.id);
      res.json({ success: true, data: docs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async uploadDocument(req, res) {
    try {
      const doc = await documentProcessingService.uploadDocument(req.params.id, req.body);
      res.status(201).json({ success: true, data: doc });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listIndexes(req, res) {
    try {
      const indexes = await vectorStoreService.listIndexes(req.params.id);
      res.json({ success: true, data: indexes });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createIndex(req, res) {
    try {
      const index = await vectorStoreService.createIndex(req.params.id, req.body.indexName);
      res.status(201).json({ success: true, data: index });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async search(req, res) {
    try {
      const result = await semanticSearchService.search(req.body.knowledgeBaseId || 'default', req.body.query, req.body.topK || 5);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getStatistics(req, res) {
    try {
      const stats = await knowledgeAnalyticsService.getStatistics(req.params.id);
      res.json({ success: true, data: stats });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = knowledgeController;
