const express = require('express');
const router = express.Router();
const testingController = require('../controllers/testing.controller');

router.get('/projects/:id/run-tests', testingController.runTests);

module.exports = router;
