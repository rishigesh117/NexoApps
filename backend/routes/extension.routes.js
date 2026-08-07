const express = require('express');
const router = express.Router();
const extensionController = require('../controllers/extension.controller');

router.get('/packages', extensionController.listExtensions);
router.post('/packages', extensionController.registerExtension);
router.get('/licenses', extensionController.listLicenses);
router.post('/licenses', extensionController.generateLicense);

module.exports = router;
