const express = require('express');
const router = express.Router();
const vaultController = require('../controllers/vault.controller');

router.get('/secrets', (req, res) => vaultController.getSecrets(req, res));
router.get('/api-keys', (req, res) => vaultController.getApiKeys(req, res));

module.exports = router;
