/**
 * Dashboard Builder Routes — NexoApps Phase 7C
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const dashboardBuilderController = require('../controllers/dashboard_builder.controller');

router.get('/', optionalAuthToken, dashboardBuilderController.listDashboards);
router.get('/executive', optionalAuthToken, dashboardBuilderController.listExecutiveDashboards);
router.get('/executive/summary', optionalAuthToken, dashboardBuilderController.getExecutiveSummary);
router.get('/:id', optionalAuthToken, dashboardBuilderController.getDashboard);
router.post('/', optionalAuthToken, dashboardBuilderController.createDashboard);
router.put('/:id', optionalAuthToken, dashboardBuilderController.updateDashboard);
router.delete('/:id', optionalAuthToken, dashboardBuilderController.deleteDashboard);
router.get('/:id/widgets', optionalAuthToken, dashboardBuilderController.listWidgets);
router.post('/:id/widgets', optionalAuthToken, dashboardBuilderController.addWidget);
router.delete('/:id/widgets/:widgetId', optionalAuthToken, dashboardBuilderController.removeWidget);

module.exports = router;
