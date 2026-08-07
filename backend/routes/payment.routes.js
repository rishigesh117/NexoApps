const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

router.get('/gateways', (req, res) => paymentController.getGateways(req, res));
router.post('/process', (req, res) => paymentController.processPayment(req, res));

module.exports = router;
