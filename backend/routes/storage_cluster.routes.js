const express = require('express');
const router = express.Router();
const storageClusterController = require('../controllers/storage_cluster.controller');

router.get('/clusters', (req, res) => storageClusterController.getStorageClusters(req, res));

module.exports = router;
