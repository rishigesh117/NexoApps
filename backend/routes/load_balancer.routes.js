const express = require('express');
const router = express.Router();
const loadBalancerController = require('../controllers/load_balancer.controller');

router.get('/', (req, res) => loadBalancerController.getLoadBalancers(req, res));
router.post('/', (req, res) => loadBalancerController.createLoadBalancer(req, res));
router.get('/targets', (req, res) => loadBalancerController.getTargets(req, res));

module.exports = router;
