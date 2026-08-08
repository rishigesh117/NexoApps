const express = require('express');
const router = express.Router();
const edgeController = require('../controllers/edge.controller');

router.get('/locations', (req, res) => edgeController.getLocations(req, res));
router.post('/locations', (req, res) => edgeController.createLocation(req, res));
router.get('/nodes', (req, res) => edgeController.getNodes(req, res));
router.get('/global-routes', (req, res) => edgeController.getGlobalRoutes(req, res));
router.post('/global-routes', (req, res) => edgeController.createGlobalRoute(req, res));

module.exports = router;
