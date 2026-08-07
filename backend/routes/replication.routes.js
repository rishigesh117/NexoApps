const express = require('express');
const router = express.Router();
const replicationController = require('../controllers/replication.controller');

router.get('/status', (req, res) => replicationController.getReplication(req, res));

module.exports = router;
