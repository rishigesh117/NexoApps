const express = require('express');
const router = express.Router();
const cloudController = require('../controllers/cloud.controller');

router.get('/overview', (req, res) => cloudController.getOverview(req, res));
router.get('/providers', (req, res) => cloudController.getProviders(req, res));
router.post('/providers', (req, res) => cloudController.createProvider(req, res));
router.get('/accounts', (req, res) => cloudController.getAccounts(req, res));
router.post('/accounts', (req, res) => cloudController.createAccount(req, res));

module.exports = router;
