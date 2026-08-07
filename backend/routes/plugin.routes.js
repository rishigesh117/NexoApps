const express = require('express');
const router = express.Router();
const pluginController = require('../controllers/plugin.controller');

router.get('/registry', pluginController.listPlugins);
router.post('/registry', pluginController.registerPlugin);
router.get('/installations', pluginController.listInstallations);
router.post('/install', pluginController.installPlugin);

module.exports = router;
