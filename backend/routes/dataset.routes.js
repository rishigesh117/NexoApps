const express = require('express');
const router = express.Router();
const datasetController = require('../controllers/dataset.controller');

router.get('/datasets', (req, res) => datasetController.getDatasets(req, res));
router.get('/feature-stores', (req, res) => datasetController.getStores(req, res));

module.exports = router;
