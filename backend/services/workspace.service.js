/**
 * Workspace Overview & Metrics Service
 * NexoApps Platform - Phase 5D
 */

const organizationService = require('./organization.service');

class WorkspaceService {
  getWorkspaceOverview(userId) {
    const orgs = organizationService.getAllOrganizations();
    const activeOrg = orgs[0] || null;

    return {
      activeOrganization: activeOrg,
      organizations: orgs,
      stats: {
        totalMembers: activeOrg?.membersCount || 5,
        totalProjects: activeOrg?.projectsCount || 3,
        activeDeployments: 12,
        monthlyDownloads: 142500,
        averageRating: 4.9,
      },
    };
  }
}

module.exports = new WorkspaceService();
