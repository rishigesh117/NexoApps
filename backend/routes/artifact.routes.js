const express = require('express');
const router = express.Router();
const artifactController = require('../controllers/artifact.controller');

router.get('/artifacts', (req, res) => artifactController.getArtifacts(req, res));
router.get('/containers', (req, res) => artifactController.getContainerImages(req, res));

module.exports = router;
