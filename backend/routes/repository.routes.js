const express = require('express');
const router = express.Router();
const repositoryController = require('../controllers/repository.controller');

router.get('/repos', (req, res) => repositoryController.getRepositories(req, res));
router.get('/branches', (req, res) => repositoryController.getBranches(req, res));
router.get('/merge-requests', (req, res) => repositoryController.getMergeRequests(req, res));

module.exports = router;
