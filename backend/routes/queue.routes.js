const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queue.controller');

router.get('/queues', (req, res) => queueController.getQueues(req, res));
router.get('/jobs', (req, res) => queueController.getJobs(req, res));

module.exports = router;
