/**
 * Certificate Service — NexoApps Phase 12D (v9.4)
 * SSL/TLS Certificate inventory, domain binding, expiration monitoring.
 */

class CertificateService {
  constructor() {
    this.certificates = [
      {
        id: 'cert-1',
        domainName: '*.nexoapps.internal',
        issuer: 'NexoApps Enterprise Internal CA',
        status: 'valid',
        validFrom: new Date(Date.now() - 30 * 86400000).toISOString(),
        expiresAt: new Date(Date.now() + 335 * 86400000).toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: 'cert-2',
        domainName: 'api.nexoapps.io',
        issuer: "Let's Encrypt Authority X3",
        status: 'valid',
        validFrom: new Date(Date.now() - 60 * 86400000).toISOString(),
        expiresAt: new Date(Date.now() + 30 * 86400000).toISOString(),
        createdAt: new Date().toISOString(),
      },
    ];

    this.bindings = [
      { id: 'cb-1', certificateId: 'cert-1', gatewayId: 'gw-core-01', port: 443, boundAt: new Date().toISOString() },
    ];
  }

  async getCertificates() {
    return this.certificates;
  }

  async getBindings(certificateId) {
    if (certificateId) return this.bindings.filter((b) => b.certificateId === certificateId);
    return this.bindings;
  }

  async registerCertificate(data) {
    const cert = {
      id: `cert-${Date.now()}`,
      domainName: data.domainName,
      issuer: data.issuer || 'NexoApps Managed CA',
      status: 'valid',
      validFrom: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 86400000).toISOString(),
      createdAt: new Date().toISOString(),
    };
    this.certificates.push(cert);
    return cert;
  }
}

module.exports = new CertificateService();
