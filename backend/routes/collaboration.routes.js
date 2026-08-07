const express = require('express');
const router = express.Router();
const collaborationController = require('../controllers/collaboration.controller');

// Document Library routes
router.get('/documents/libraries', (req, res) => collaborationController.getDocumentLibraries(req, res));
router.post('/documents/libraries', (req, res) => collaborationController.createDocumentLibrary(req, res));
router.get('/documents/shared', (req, res) => collaborationController.getSharedDocuments(req, res));
router.post('/documents/shared', (req, res) => collaborationController.createSharedDocument(req, res));

// Whiteboard routes
router.get('/whiteboards', (req, res) => collaborationController.getWhiteboards(req, res));
router.post('/whiteboards', (req, res) => collaborationController.createWhiteboard(req, res));
router.get('/whiteboards/:id/objects', (req, res) => collaborationController.getWhiteboardObjects(req, res));
router.post('/whiteboards/:id/objects', (req, res) => collaborationController.addWhiteboardObject(req, res));

// Project Space routes
router.get('/projects/spaces', (req, res) => collaborationController.getProjectSpaces(req, res));
router.post('/projects/spaces', (req, res) => collaborationController.createProjectSpace(req, res));
router.get('/projects/tasks', (req, res) => collaborationController.getProjectTasks(req, res));
router.post('/projects/tasks', (req, res) => collaborationController.createProjectTask(req, res));

// Analytics, Notifications, Audit Logs
router.get('/analytics', (req, res) => collaborationController.getAnalytics(req, res));
router.get('/notifications', (req, res) => collaborationController.getTeamNotifications(req, res));
router.get('/audit-logs', (req, res) => collaborationController.getAuditLogs(req, res));

module.exports = router;
