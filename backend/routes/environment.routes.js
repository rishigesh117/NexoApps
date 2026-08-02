/**
 * Environment Routes — NexoApps Phase 7D
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const environmentController = require('../controllers/environment.controller');

router.get('/profiles', optionalAuthToken, environmentController.listProfiles);
router.post('/profiles', optionalAuthToken, environmentController.createProfile);
router.get('/profiles/:profileId/variables', optionalAuthToken, environmentController.listVariables);
router.post('/profiles/:profileId/variables', optionalAuthToken, environmentController.addVariable);

router.get('/secrets', optionalAuthToken, environmentController.listSecrets);
router.post('/secrets', optionalAuthToken, environmentController.createSecret);
router.post('/secrets/:id/rotate', optionalAuthToken, environmentController.rotateSecret);

module.exports = router;
