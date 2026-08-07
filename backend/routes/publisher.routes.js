const express = require('express');
const router = express.Router();
const publisherController = require('../controllers/publisher.controller');

router.get('/dashboard', publisherController.getPublisherDashboard);
router.get('/list', publisherController.listPublishers);
router.post('/verify/:id', publisherController.verifyPublisher);

module.exports = router;
