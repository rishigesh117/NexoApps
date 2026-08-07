const express = require('express');
const router = express.Router();
const adminController = require('../controllers/enterprise_admin.controller');

router.get('/ai-hub', (req, res) => adminController.getAIHub(req, res));
router.get('/health', (req, res) => adminController.getHealth(req, res));
router.get('/costs', (req, res) => adminController.getCosts(req, res));

module.exports = router;
