const express = require('express');
const router = express.Router();
const alertingController = require('../controllers/alerting.controller');

router.get('/rules', (req, res) => alertingController.getRules(req, res));
router.post('/rules', (req, res) => alertingController.createRule(req, res));
router.put('/rules/:id', (req, res) => alertingController.updateRule(req, res));
router.get('/events', (req, res) => alertingController.getEvents(req, res));
router.put('/events/:id/acknowledge', (req, res) => alertingController.acknowledgeEvent(req, res));
router.put('/events/:id/resolve', (req, res) => alertingController.resolveEvent(req, res));

module.exports = router;
