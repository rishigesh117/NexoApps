const express = require('express');
const router = express.Router();
const regionController = require('../controllers/region.controller');

router.get('/', (req, res) => regionController.getRegions(req, res));
router.post('/', (req, res) => regionController.createRegion(req, res));
router.get('/zones', (req, res) => regionController.getZones(req, res));
router.get('/health', (req, res) => regionController.getRegionHealth(req, res));
router.get('/capacity', (req, res) => regionController.getRegionCapacity(req, res));

module.exports = router;
