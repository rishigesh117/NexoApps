const express = require('express');
const router = express.Router();
const loggingController = require('../controllers/logging.controller');

router.get('/sources', (req, res) => loggingController.getSources(req, res));
router.get('/streams', (req, res) => loggingController.getStreams(req, res));
router.get('/', (req, res) => loggingController.getLogs(req, res));
router.post('/search', (req, res) => loggingController.searchLogs(req, res));
router.post('/ingest', (req, res) => loggingController.ingestLog(req, res));

module.exports = router;
