/**
 * Prediction Routes — NexoApps Phase 7C
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const predictionController = require('../controllers/prediction.controller');

router.get('/jobs', optionalAuthToken, predictionController.listJobs);
router.post('/jobs', optionalAuthToken, predictionController.createJob);
router.get('/jobs/:id/results', optionalAuthToken, predictionController.getJobResults);
router.get('/audit-reports', optionalAuthToken, predictionController.listAuditReports);
router.post('/audit-reports', optionalAuthToken, predictionController.generateAuditReport);

module.exports = router;
