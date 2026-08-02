/**
 * Dataset Routes
 * NexoApps Platform - Phase 6C (Version 2.3)
 */

const express = require('express');
const router = express.Router();
const datasetController = require('../controllers/dataset.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, datasetController.getDatasets);
router.post('/', optionalAuthToken, datasetController.createDataset);

module.exports = router;
