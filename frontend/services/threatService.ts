import { fetchApi } from './apiClient';
import { ThreatIntel, VulnerabilityReport } from '../../shared/types';

export const threatService = {
  getThreats: async (): Promise<ThreatIntel[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: ThreatIntel[] }>('/security/core/threats');
      return res.data;
    } catch {
      return [
        { id: 'th-1', indicator: '198.51.100.42', threatType: 'Tor Exit Node Brute-Force', riskScore: 94.5, detectedAt: new Date().toISOString() },
        { id: 'th-2', indicator: 'malicious-domain.phish', threatType: 'Credential Phishing Domain', riskScore: 88.0, detectedAt: new Date().toISOString() }
      ];
    }
  },

  getVulnerabilities: async (): Promise<VulnerabilityReport[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: VulnerabilityReport[] }>('/security/core/vulnerabilities');
      return res.data;
    } catch {
      return [
        { id: 'vuln-101', cveId: 'CVE-2024-3094', severity: 'critical', affectedComponent: 'xz-utils (SSH Tunnel)', remediationStatus: 'patched', discoveredAt: new Date(Date.now() - 864000000).toISOString() }
      ];
    }
  }
};
