/**
 * Threat Detection Service — NexoApps Phase 10D
 * AI Threat Intelligence, IP reputation, anomaly feeds, and SIEM integration.
 */

class ThreatDetectionService {
  constructor() {
    this.threats = [
      { id: 'th-1', indicator: '198.51.100.42', threatType: 'Tor Exit Node Brute-Force', riskScore: 94.5, detectedAt: new Date().toISOString() },
      { id: 'th-2', indicator: 'malicious-domain.phish', threatType: 'Credential Phishing Domain', riskScore: 88.0, detectedAt: new Date().toISOString() }
    ];
  }

  async getThreats() {
    return this.threats;
  }
}

module.exports = new ThreatDetectionService();
