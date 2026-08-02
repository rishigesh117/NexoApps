/**
 * Reports Routes — NexoApps Phase 7C
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const reportController = require('../controllers/report.controller');

router.get('/', optionalAuthToken, reportController.listReports);
router.get('/:id', optionalAuthToken, reportController.getReport);
router.post('/', optionalAuthToken, reportController.createReport);
router.put('/:id', optionalAuthToken, reportController.updateReport);
router.delete('/:id', optionalAuthToken, reportController.deleteReport);
router.get('/:id/schedules', optionalAuthToken, reportController.listSchedules);
router.post('/:id/schedules', optionalAuthToken, reportController.createSchedule);
router.get('/:id/exports', optionalAuthToken, reportController.listExports);
router.post('/:id/export', optionalAuthToken, reportController.exportReport);

module.exports = router;
