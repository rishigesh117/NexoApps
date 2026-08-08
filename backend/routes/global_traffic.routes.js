const express = require('express');
const router = express.Router();
const globalTrafficController = require('../controllers/global_traffic.controller');

router.get('/rules', (req, res) => globalTrafficController.getRules(req, res));
router.post('/rules', (req, res) => globalTrafficController.createRule(req, res));
router.get('/failover-policies', (req, res) => globalTrafficController.getFailoverPolicies(req, res));
router.post('/failover-policies', (req, res) => globalTrafficController.createFailoverPolicy(req, res));
router.get('/services', (req, res) => globalTrafficController.getServices(req, res));
router.get('/service-bindings', (req, res) => globalTrafficController.getServiceBindings(req, res));

module.exports = router;
