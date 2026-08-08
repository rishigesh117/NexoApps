const express = require('express');
const router = express.Router();
const edgeWorkloadController = require('../controllers/edge_workload.controller');

router.get('/', (req, res) => edgeWorkloadController.getWorkloads(req, res));
router.post('/', (req, res) => edgeWorkloadController.createWorkload(req, res));
router.get('/deployments', (req, res) => edgeWorkloadController.getDeployments(req, res));

module.exports = router;
