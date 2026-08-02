/**
 * Knowledge Routes — NexoApps Phase 8C
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const knowledgeController = require('../controllers/knowledge.controller');

router.get('/bases', optionalAuthToken, knowledgeController.listBases);
router.get('/bases/:id', optionalAuthToken, knowledgeController.getBase);
router.post('/bases', optionalAuthToken, knowledgeController.createBase);
router.get('/bases/:id/documents', optionalAuthToken, knowledgeController.listDocuments);
router.post('/bases/:id/documents', optionalAuthToken, knowledgeController.uploadDocument);
router.get('/bases/:id/indexes', optionalAuthToken, knowledgeController.listIndexes);
router.post('/bases/:id/indexes', optionalAuthToken, knowledgeController.createIndex);
router.post('/search', optionalAuthToken, knowledgeController.search);
router.get('/bases/:id/statistics', optionalAuthToken, knowledgeController.getStatistics);

module.exports = router;
