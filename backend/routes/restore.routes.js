const express = require('express');
const router = express.Router();
const restoreController = require('../controllers/restore.controller');

router.get('/jobs', (req, res) => restoreController.getRestores(req, res));

module.exports = router;
