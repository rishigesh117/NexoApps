const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resource.controller');

router.get('/', (req, res) => resourceController.getResources(req, res));
router.post('/', (req, res) => resourceController.createResource(req, res));
router.get('/types', (req, res) => resourceController.getResourceTypes(req, res));

module.exports = router;
