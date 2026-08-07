const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/training.controller');

router.get('/jobs', (req, res) => trainingController.getJobs(req, res));
router.get('/experiments', (req, res) => trainingController.getExperiments(req, res));

module.exports = router;
