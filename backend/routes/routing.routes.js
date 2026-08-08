const express = require('express');
const router = express.Router();
const routingController = require('../controllers/routing.controller');

router.get('/', (req, res) => routingController.getRoutes(req, res));
router.post('/', (req, res) => routingController.createRoute(req, res));
router.get('/upstreams', (req, res) => routingController.getUpstreams(req, res));
router.get('/traffic-policies', (req, res) => routingController.getTrafficPolicies(req, res));
router.post('/traffic-policies', (req, res) => routingController.createTrafficPolicy(req, res));
router.get('/rate-limits', (req, res) => routingController.getRateLimitPolicies(req, res));
router.post('/rate-limits', (req, res) => routingController.createRateLimitPolicy(req, res));
router.get('/api-policies', (req, res) => routingController.getApiPolicies(req, res));

module.exports = router;
