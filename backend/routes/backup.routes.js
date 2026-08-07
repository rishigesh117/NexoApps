const express = require('express');
const router = express.Router();
const backupController = require('../controllers/backup.controller');

router.get('/jobs', (req, res) => backupController.getBackups(req, res));

module.exports = router;
