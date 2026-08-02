/**
 * Creator Profile & Verification Service
 * NexoApps Platform - Phase 6D (Version 2.4)
 */

class CreatorService {
  constructor() {
    this.creators = [
      {
        id: 'c-1',
        userId: 'usr-1',
        username: 'rishigesh',
        displayName: 'Rishigesh AI Studio',
        bio: 'Building next-generation AI agents, match analytics systems, and developer tools.',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        website: 'https://nexoapps.dev',
        isVerified: true,
        totalEarnings: 14850.00,
        followersCount: 1240,
        createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
      },
      {
        id: 'c-2',
        userId: 'usr-2',
        username: 'nexo-labs',
        displayName: 'Nexo AI Research Labs',
        bio: 'Core AI foundation models, fine-tuned LLMs, and high-performance inference weights.',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
        website: 'https://nexoapps.dev/labs',
        isVerified: true,
        totalEarnings: 42300.00,
        followersCount: 3890,
        createdAt: new Date(Date.now() - 86400000 * 90).toISOString(),
      },
    ];
  }

  getCreators() {
    return this.creators;
  }

  getCreatorByUsername(username) {
    return this.creators.find((c) => c.username === username) || this.creators[0];
  }
}

module.exports = new CreatorService();
