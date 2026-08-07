const express = require('express');
const router = express.Router();
const cacheController = require('../controllers/cache.controller');

router.get('/clusters', (req, res) => cacheController.getClusters(req, res));

module.exports = router;
