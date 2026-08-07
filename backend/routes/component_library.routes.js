/**
 * Component Library Routes — NexoApps Phase 9B
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const componentLibraryController = require('../controllers/component_library.controller');

router.get('/', optionalAuthToken, componentLibraryController.listComponents);
router.post('/', optionalAuthToken, componentLibraryController.createComponent);
router.get('/categories', optionalAuthToken, componentLibraryController.listCategories);

module.exports = router;
