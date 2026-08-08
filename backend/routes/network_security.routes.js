const express = require('express');
const router = express.Router();
const securityNetworkController = require('../controllers/security_network.controller');

router.get('/waf/policies', (req, res) => securityNetworkController.getWafPolicies(req, res));
router.post('/waf/policies', (req, res) => securityNetworkController.createWafPolicy(req, res));
router.get('/waf/rules', (req, res) => securityNetworkController.getWafRules(req, res));
router.get('/firewall/policies', (req, res) => securityNetworkController.getFirewallPolicies(req, res));
router.post('/firewall/policies', (req, res) => securityNetworkController.createFirewallPolicy(req, res));
router.get('/network-policies', (req, res) => securityNetworkController.getNetworkPolicies(req, res));
router.post('/network-policies', (req, res) => securityNetworkController.createNetworkPolicy(req, res));

module.exports = router;
