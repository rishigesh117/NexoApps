const express = require('express');
const router = express.Router();
const developerCloudController = require('../controllers/developer_cloud.controller');

router.get('/overview', (req, res) => developerCloudController.getOverview(req, res));
router.get('/orgs', (req, res) => developerCloudController.getOrganizations(req, res));
router.get('/teams', (req, res) => developerCloudController.getTeams(req, res));
router.get('/runners', (req, res) => developerCloudController.getRunners(req, res));

module.exports = router;
