const express = require('express');
const router = express.Router();
const dnsController = require('../controllers/dns.controller');

router.get('/zones', (req, res) => dnsController.getZones(req, res));
router.post('/zones', (req, res) => dnsController.createZone(req, res));
router.get('/records', (req, res) => dnsController.getRecords(req, res));
router.post('/records', (req, res) => dnsController.createRecord(req, res));
router.get('/certificates', (req, res) => dnsController.getCertificates(req, res));
router.post('/certificates', (req, res) => dnsController.registerCertificate(req, res));

module.exports = router;
