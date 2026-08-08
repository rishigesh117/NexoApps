const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incident.controller');

router.get('/', (req, res) => incidentController.getIncidents(req, res));
router.post('/', (req, res) => incidentController.createIncident(req, res));
router.get('/:id', (req, res) => incidentController.getIncidentById(req, res));
router.put('/:id', (req, res) => incidentController.updateIncident(req, res));
router.post('/:id/notes', (req, res) => incidentController.addNote(req, res));

module.exports = router;
