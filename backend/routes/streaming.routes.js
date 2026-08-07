const express = require('express');
const router = express.Router();
const streamingController = require('../controllers/streaming.controller');

router.get('/topics', (req, res) => streamingController.getTopics(req, res));

module.exports = router;
