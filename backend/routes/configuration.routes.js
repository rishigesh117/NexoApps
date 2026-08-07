const express = require('express');
const router = express.Router();
const configurationController = require('../controllers/configuration.controller');

router.get('/configs', (req, res) => configurationController.getConfigs(req, res));

module.exports = router;
