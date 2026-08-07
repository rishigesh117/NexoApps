const express = require('express');
const router = express.Router();
const computeController = require('../controllers/compute.controller');

router.get('/clusters', (req, res) => computeController.getClusters(req, res));
router.get('/vms', (req, res) => computeController.getVirtualMachines(req, res));
router.post('/vms', (req, res) => computeController.launchVM(req, res));

module.exports = router;
