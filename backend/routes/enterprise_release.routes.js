const express = require('express');
const router = express.Router();
const releaseController = require('../controllers/enterprise_release.controller');

router.get('/releases', (req, res) => releaseController.getReleases(req, res));
router.get('/backups', (req, res) => releaseController.getBackups(req, res));
router.post('/backups', (req, res) => releaseController.createBackup(req, res));

module.exports = router;
