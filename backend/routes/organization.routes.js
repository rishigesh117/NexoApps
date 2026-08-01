/**
 * Organization Routes
 * NexoApps Platform - Phase 5D
 */

const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organization.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, organizationController.getAllOrganizations);
router.post('/', optionalAuthToken, organizationController.createOrganization);
router.get('/slug/:slug', optionalAuthToken, organizationController.getOrganizationBySlug);
router.get('/:orgId/members', optionalAuthToken, organizationController.getMembers);
router.post('/:orgId/invitations', optionalAuthToken, organizationController.inviteMember);

module.exports = router;
