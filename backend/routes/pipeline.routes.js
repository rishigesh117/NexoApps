const express = require('express');
const router = express.Router();
const pipelineController = require('../controllers/pipeline.controller');

router.get('/definitions', (req, res) => pipelineController.getPipelines(req, res));
router.get('/runs', (req, res) => pipelineController.getRuns(req, res));

module.exports = router;
