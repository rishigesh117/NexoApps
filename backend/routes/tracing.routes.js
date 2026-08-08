const express = require('express');
const router = express.Router();
const tracingController = require('../controllers/tracing.controller');

router.get('/services', (req, res) => tracingController.getServices(req, res));
router.get('/', (req, res) => tracingController.getTraces(req, res));
router.get('/:id', (req, res) => tracingController.getTraceById(req, res));
router.post('/spans', (req, res) => tracingController.ingestSpan(req, res));

module.exports = router;
