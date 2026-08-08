/**
 * DNS Controller — NexoApps Phase 12D (v9.4)
 */

const dnsService = require('../services/dns.service');
const certificateService = require('../services/certificate.service');

class DnsController {
  async getZones(req, res) {
    try {
      const zones = await dnsService.getZones();
      res.json({ success: true, data: zones });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createZone(req, res) {
    try {
      const { zoneName } = req.body;
      if (!zoneName) return res.status(400).json({ success: false, error: 'zoneName is required' });
      const zone = await dnsService.createZone(req.body);
      res.status(201).json({ success: true, data: zone });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getRecords(req, res) {
    try {
      const records = await dnsService.getRecords(req.query.zoneId);
      res.json({ success: true, data: records });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createRecord(req, res) {
    try {
      const { recordName, recordValue } = req.body;
      if (!recordName || !recordValue) {
        return res.status(400).json({ success: false, error: 'recordName and recordValue are required' });
      }
      const record = await dnsService.createRecord(req.body);
      res.status(201).json({ success: true, data: record });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getCertificates(req, res) {
    try {
      const certs = await certificateService.getCertificates();
      res.json({ success: true, data: certs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async registerCertificate(req, res) {
    try {
      const { domainName } = req.body;
      if (!domainName) return res.status(400).json({ success: false, error: 'domainName is required' });
      const cert = await certificateService.registerCertificate(req.body);
      res.status(201).json({ success: true, data: cert });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new DnsController();
