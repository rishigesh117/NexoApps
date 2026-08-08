const express = require('express');
const router = express.Router();
const observabilityController = require('../controllers/observability.controller');

router.get('/overview', (req, res) => observabilityController.getOverview(req, res));
router.get('/projects', (req, res) => observabilityController.getProjects(req, res));
router.post('/projects', (req, res) => observabilityController.createProject(req, res));
router.get('/services', (req, res) => observabilityController.getServices(req, res));
router.get('/services/:id', (req, res) => observabilityController.getServiceById(req, res));
router.get('/dependencies', (req, res) => observabilityController.getDependencies(req, res));
router.get('/dashboards', (req, res) => observabilityController.getDashboards(req, res));
router.post('/dashboards', (req, res) => observabilityController.createDashboard(req, res));
router.get('/ai-recommendations', (req, res) => observabilityController.getAIRecommendations(req, res));

module.exports = router;
