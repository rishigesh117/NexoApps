const express = require('express');
const router = express.Router();
const identityController = require('../controllers/identity.controller');

router.get('/providers', (req, res) => identityController.getProviders(req, res));
router.get('/roles', (req, res) => identityController.getRoles(req, res));

module.exports = router;
