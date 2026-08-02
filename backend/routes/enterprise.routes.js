/**
 * Enterprise Routes — NexoApps Phase 8D
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const enterpriseController = require('../controllers/enterprise.controller');

router.get('/departments', optionalAuthToken, enterpriseController.listDepartments);
router.get('/employees/:departmentId', optionalAuthToken, enterpriseController.listEmployees);
router.post('/employees/:departmentId', optionalAuthToken, enterpriseController.createEmployee);
router.get('/dashboard', optionalAuthToken, enterpriseController.getDashboard);
router.get('/metrics/:departmentId', optionalAuthToken, enterpriseController.getMetrics);

module.exports = router;
