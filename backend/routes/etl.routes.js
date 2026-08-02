/**
 * ETL Routes — NexoApps Phase 7C
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const etlController = require('../controllers/etl.controller');

router.get('/jobs', optionalAuthToken, etlController.listJobs);
router.get('/jobs/:id', optionalAuthToken, etlController.getJob);
router.post('/jobs', optionalAuthToken, etlController.createJob);
router.post('/jobs/:id/run', optionalAuthToken, etlController.runJob);
router.get('/jobs/:id/runs', optionalAuthToken, etlController.getJobRuns);
router.delete('/jobs/:id', optionalAuthToken, etlController.deleteJob);
router.get('/pipelines', optionalAuthToken, etlController.listPipelines);
router.post('/pipelines', optionalAuthToken, etlController.createPipeline);

module.exports = router;
