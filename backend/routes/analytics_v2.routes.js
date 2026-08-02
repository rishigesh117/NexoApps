/**
 * Analytics V2 Routes — NexoApps Phase 7C
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const analyticsV2Controller = require('../controllers/analytics_v2.controller');

router.get('/overview', optionalAuthToken, analyticsV2Controller.getDashboardOverview);
router.get('/models', optionalAuthToken, analyticsV2Controller.listModels);
router.get('/models/:id', optionalAuthToken, analyticsV2Controller.getModel);
router.post('/models', optionalAuthToken, analyticsV2Controller.createModel);
router.post('/models/:id/train', optionalAuthToken, analyticsV2Controller.trainModel);
router.get('/kpis', optionalAuthToken, analyticsV2Controller.listKPIs);
router.post('/kpis', optionalAuthToken, analyticsV2Controller.createKPI);
router.get('/revenue-insights', optionalAuthToken, analyticsV2Controller.getRevenueInsights);
router.get('/user-insights', optionalAuthToken, analyticsV2Controller.getUserInsights);
router.get('/platform-insights', optionalAuthToken, analyticsV2Controller.getPlatformInsights);
router.get('/data-sources', optionalAuthToken, analyticsV2Controller.listDataSources);
router.post('/data-sources', optionalAuthToken, analyticsV2Controller.createDataSource);
router.get('/warehouse-tables', optionalAuthToken, analyticsV2Controller.listWarehouseTables);
router.get('/data-quality', optionalAuthToken, analyticsV2Controller.getDataQuality);
router.get('/dataset-catalog', optionalAuthToken, analyticsV2Controller.getDatasetCatalog);

module.exports = router;
