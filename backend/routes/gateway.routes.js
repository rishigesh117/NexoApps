const express = require('express');
const router = express.Router();
const gatewayController = require('../controllers/gateway.controller');

router.get('/', (req, res) => gatewayController.getGateways(req, res));
router.post('/', (req, res) => gatewayController.createGateway(req, res));
router.get('/instances', (req, res) => gatewayController.getInstances(req, res));
router.get('/:id', (req, res) => gatewayController.getGatewayById(req, res));

module.exports = router;
