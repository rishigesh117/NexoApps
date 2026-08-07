const express = require('express');
const router = express.Router();
const releaseController = require('../controllers/release.controller');

router.get('/history', (req, res) => releaseController.getReleases(req, res));
router.get('/backups', (req, res) => releaseController.getBackups(req, res));

module.exports = router;
