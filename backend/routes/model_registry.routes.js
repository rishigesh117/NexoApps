const express = require('express');
const router = express.Router();
const modelRegistryController = require('../controllers/model_registry.controller');

router.get('/models', (req, res) => modelRegistryController.getModels(req, res));

module.exports = router;
