/**
 * Developer Service Layer
 * NexoApps Platform - Phase 3E
 */

const adminService = require('./admin.service');
const appService = require('./app.service');

class DeveloperService {
  constructor() {
    this.developers = [
      {
        id: 'dev-batlytics-001',
        userId: 'usr-admin-1',
        name: 'Batlytics Studio',
        email: 'developer@batlytics.com',
        website: 'https://batlytics.com',
        bio: 'Creators of high-precision sports analytics & cricket scoring engines.',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        status: 'Active',
        isVerified: true,
        totalApps: 3,
        createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
      },
      {
        id: 'dev-nexo-labs',
        userId: 'usr-demo-1',
        name: 'Nexo AI Labs',
        email: 'labs@nexoapps.com',
        website: 'https://nexoapps.com',
        bio: 'Building future-ready artificial intelligence tools and desktop productivity apps.',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        status: 'Active',
        isVerified: true,
        totalApps: 5,
        createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
      },
    ];
  }

  // Get all developer profiles
  getAllDevelopers(options = {}) {
    const { status, verifiedOnly, search } = options;
    let list = [...this.developers];

    if (status) {
      list = list.filter((d) => d.status === status);
    }

    if (verifiedOnly === 'true' || verifiedOnly === true) {
      list = list.filter((d) => d.isVerified);
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.email.toLowerCase().includes(q)
      );
    }

    return list;
  }

  // Get developer by ID
  getDeveloperById(id) {
    return this.developers.find((d) => d.id === id);
  }

  // Update developer status / verification
  updateDeveloper(adminUser, id, updates) {
    const dev = this.getDeveloperById(id);
    if (!dev) {
      throw new Error('Developer profile not found');
    }

    if (updates.status) {
      dev.status = updates.status;
      adminService.logActivity(
        adminUser,
        'Developer Status Updated',
        'Developer',
        dev.id,
        `Developer ${dev.name} status set to ${updates.status}`
      );
    }

    if (typeof updates.isVerified === 'boolean') {
      dev.isVerified = updates.isVerified;
      adminService.logActivity(
        adminUser,
        'Developer Verification Toggled',
        'Developer',
        dev.id,
        `Developer ${dev.name} verification set to ${dev.isVerified}`
      );
    }

    return dev;
  }

  // Assign app to developer
  assignAppToDeveloper(adminUser, developerId, appSlug) {
    const dev = this.getDeveloperById(developerId);
    if (!dev) {
      throw new Error('Developer profile not found');
    }

    const app = appService.getAppBySlug(appSlug);
    if (!app) {
      throw new Error('Application not found');
    }

    app.developer = {
      name: dev.name,
      email: dev.email,
      website: dev.website,
    };

    dev.totalApps = (dev.totalApps || 0) + 1;

    adminService.logActivity(
      adminUser,
      'App Assigned to Developer',
      'App',
      app.id,
      `Assigned app ${app.title} to developer ${dev.name}`
    );

    return { app, developer: dev };
  }
}

module.exports = new DeveloperService();
