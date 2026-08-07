const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenant.controller');

router.get('/', (req, res) => tenantController.getTenants(req, res));
router.post('/', (req, res) => tenantController.createTenant(req, res));
router.get('/:id', (req, res) => tenantController.getTenantById(req, res));

module.exports = router;
