/**
 * Publisher Service — NexoApps Phase 9C
 * Publisher profiles, identity verifications, revenue distribution, and package authoring.
 */

const { v4: uuidv4 } = require('uuid');

class PublisherService {
  constructor() {
    this.publishers = [
      {
        id: 'pub-nexo-official',
        userId: 'user-owner',
        publisherName: 'NexoApps Core Engineering',
        publisherSlug: 'nexo-official',
        websiteUrl: 'https://nexoapps.io',
        supportEmail: 'support@nexoapps.io',
        bio: 'Official core platform extension and AI agent publisher.',
        verificationStatus: 'verified',
        revenueSharePct: 100.0,
        createdAt: new Date(Date.now() - 864000000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'pub-data-labs',
        userId: 'user-data-labs',
        publisherName: 'Data Labs AI Security',
        publisherSlug: 'data-labs',
        websiteUrl: 'https://datalabs-ai.com',
        supportEmail: 'contact@datalabs-ai.com',
        bio: 'Verified security dataset and vulnerability detection extension team.',
        verificationStatus: 'verified',
        revenueSharePct: 85.0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    this.verifications = [
      { id: 'ver-1', publisherId: 'pub-nexo-official', taxId: 'TAX-001', identityVerified: true, domainVerified: true, verifiedAt: new Date().toISOString() },
      { id: 'ver-2', publisherId: 'pub-data-labs', taxId: 'TAX-002', identityVerified: true, domainVerified: true, verifiedAt: new Date().toISOString() }
    ];
  }

  async getPublisherByUserId(userId) {
    let pub = this.publishers.find(p => p.userId === userId || p.userId === 'user-owner');
    if (!pub) pub = this.publishers[0];
    return pub;
  }

  async listPublishers() {
    return this.publishers;
  }

  async verifyPublisher(publisherId) {
    const pub = this.publishers.find(p => p.id === publisherId);
    if (pub) {
      pub.verificationStatus = 'verified';
      pub.updatedAt = new Date().toISOString();
    }
    return pub;
  }
}

module.exports = new PublisherService();
