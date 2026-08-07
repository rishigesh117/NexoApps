const express = require('express');
const router = express.Router();
const storageController = require('../controllers/storage.controller');

router.get('/volumes', (req, res) => storageController.getVolumes(req, res));
router.get('/buckets', (req, res) => storageController.getBuckets(req, res));

module.exports = router;
