const express = require('express');
const router = express.Router();
const engineeringController = require('../controllers/engineering.controller');

router.get('/projects/:id/architecture', engineeringController.getArchitecture);
router.get('/projects/:id/database', engineeringController.getDatabaseDesign);
router.get('/projects/:id/api-spec', engineeringController.getApiSpec);
router.get('/projects/:id/code-review', engineeringController.getCodeReview);
router.get('/projects/:id/security-scan', engineeringController.getSecurityScan);
router.get('/projects/:id/documentation', engineeringController.getDocumentation);
router.get('/projects/:id/dependencies', engineeringController.getDependencies);
router.get('/projects/:id/bugs', engineeringController.listBugs);
router.get('/projects/:id/pipelines', engineeringController.getPipelines);
router.get('/projects/:id/metrics', engineeringController.getMetrics);

module.exports = router;
