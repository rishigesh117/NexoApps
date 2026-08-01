/**
 * Suggestion Routes Blueprint
 * NexoApps Platform
 */

const express = require('express');
const router = express.Router();
const suggestionController = require('../controllers/suggestion.controller');

router.post('/', suggestionController.submitSuggestion);

module.exports = router;
