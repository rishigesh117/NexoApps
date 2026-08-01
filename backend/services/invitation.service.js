/**
 * Organization Invitations Service
 * NexoApps Platform - Phase 5D
 */

class InvitationService {
  constructor() {
    this.invitations = [
      {
        id: 'inv-1',
        organizationId: 'org-101',
        organizationName: 'Batlytics Studio Org',
        email: 'qa.lead@batlytics.com',
        role: 'reviewer',
        invitedBy: 'usr-1',
        status: 'Pending',
        token: 'tok-inv-1001',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
      },
    ];
  }

  getInvitations(organizationId) {
    if (!organizationId) return this.invitations;
    return this.invitations.filter((i) => i.organizationId === organizationId);
  }

  createInvitation(organizationId, email, role = 'developer', invitedBy = 'usr-1') {
    const newInv = {
      id: `inv-${Date.now()}`,
      organizationId,
      organizationName: 'Batlytics Studio Org',
      email,
      role,
      invitedBy,
      status: 'Pending',
      token: `tok-inv-${Date.now()}`,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
    };
    this.invitations.unshift(newInv);
    return newInv;
  }
}

module.exports = new InvitationService();
