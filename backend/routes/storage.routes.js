const express = require('express');
const router = express.Router();
const storageController = require('../controllers/storage.controller');

router.get('/storage-explorer', (req, res) => storageController.getStorage(req, res));

module.exports = router;
