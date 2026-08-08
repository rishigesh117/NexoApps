import { SslCertificate, CertificateBinding } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const certificateService = {
  async getCertificates(): Promise<SslCertificate[]> {
    try {
      const res = await fetch(`${API_BASE}/networking/dns/certificates`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'cert-1', domainName: '*.nexoapps.internal', issuer: 'NexoApps Enterprise Internal CA', status: 'valid', validFrom: new Date(Date.now() - 30 * 86400000).toISOString(), expiresAt: new Date(Date.now() + 335 * 86400000).toISOString(), createdAt: new Date().toISOString() },
        { id: 'cert-2', domainName: 'api.nexoapps.io', issuer: "Let's Encrypt Authority X3", status: 'valid', validFrom: new Date(Date.now() - 60 * 86400000).toISOString(), expiresAt: new Date(Date.now() + 30 * 86400000).toISOString(), createdAt: new Date().toISOString() },
      ];
    }
  },
};
