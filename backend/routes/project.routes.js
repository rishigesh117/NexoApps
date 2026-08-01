/**
 * Project Routes
 * NexoApps Platform - Phase 5D
 */

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, projectController.getProjects);
router.post('/', optionalAuthToken, projectController.createProject);

module.exports = router;
