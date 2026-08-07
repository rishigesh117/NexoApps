const express = require('express');
const router = express.Router();
const codeGenerationController = require('../controllers/code_generation.controller');

router.post('/generate', codeGenerationController.generateCode);

module.exports = router;
