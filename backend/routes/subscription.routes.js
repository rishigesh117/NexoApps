const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');

router.get('/plans', (req, res) => subscriptionController.getPlans(req, res));
router.get('/current', (req, res) => subscriptionController.getCurrentSubscription(req, res));
router.post('/subscribe', (req, res) => subscriptionController.subscribe(req, res));

module.exports = router;
