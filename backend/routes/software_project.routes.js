const express = require('express');
const router = express.Router();
const softwareProjectController = require('../controllers/software_project.controller');

router.get('/projects', softwareProjectController.listProjects);
router.post('/projects', softwareProjectController.createProject);
router.get('/projects/:id', softwareProjectController.getProjectById);
router.post('/projects/:id/assistant', softwareProjectController.askAssistant);

module.exports = router;
