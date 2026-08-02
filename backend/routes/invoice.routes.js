/**
 * Invoice Routes
 * NexoApps Platform - Phase 7A (Version 3.0)
 */

const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoice.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, invoiceController.getInvoices);

module.exports = router;
