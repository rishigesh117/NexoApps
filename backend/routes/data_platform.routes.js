const express = require('express');
const router = express.Router();
const dataPlatformController = require('../controllers/data_platform.controller');

router.get('/sources', (req, res) => dataPlatformController.getDataSources(req, res));
router.post('/sources', (req, res) => dataPlatformController.addDataSource(req, res));
router.get('/lakehouse', (req, res) => dataPlatformController.getLakehouses(req, res));
router.get('/catalog', (req, res) => dataPlatformController.getCatalog(req, res));

module.exports = router;
