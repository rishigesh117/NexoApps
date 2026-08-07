const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resource.controller');

router.get('/groups', (req, res) => resourceController.getResourceGroups(req, res));
router.get('/allocations', (req, res) => resourceController.getAllocations(req, res));

module.exports = router;
