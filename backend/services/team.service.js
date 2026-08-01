/**
 * Team Members & Roles Service
 * NexoApps Platform - Phase 5D
 */

class TeamService {
  constructor() {
    this.members = [
      {
        id: 'mem-1',
        organizationId: 'org-101',
        userId: 'usr-1',
        username: 'Rishigesh',
        email: 'rishigesh720@gmail.com',
        role: 'owner',
        avatarUrl: '',
        joinedAt: new Date(Date.now() - 30 * 86400000).toISOString(),
      },
      {
        id: 'mem-2',
        organizationId: 'org-101',
        userId: 'usr-2',
        username: 'BatlyticsDev',
        email: 'dev@batlytics.com',
        role: 'admin',
        avatarUrl: '',
        joinedAt: new Date(Date.now() - 20 * 86400000).toISOString(),
      },
      {
        id: 'mem-3',
        organizationId: 'org-101',
        userId: 'usr-3',
        username: 'CricketAnalyst',
        email: 'analyst@batlytics.com',
        role: 'developer',
        avatarUrl: '',
        joinedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
      },
    ];
  }

  getMembers(organizationId) {
    if (!organizationId) return this.members;
    return this.members.filter((m) => m.organizationId === organizationId);
  }

  updateRole(memberId, newRole) {
    const member = this.members.find((m) => m.id === memberId);
    if (!member) throw new Error('Member not found');
    member.role = newRole;
    return member;
  }

  removeMember(memberId) {
    this.members = this.members.filter((m) => m.id !== memberId);
    return true;
  }
}

module.exports = new TeamService();
