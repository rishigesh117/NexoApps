const express = require('express');
const router = express.Router();
const supportController = require('../controllers/enterprise_support.controller');

router.get('/cases', (req, res) => supportController.getSupportCases(req, res));
router.post('/cases', (req, res) => supportController.createSupportCase(req, res));

module.exports = router;
