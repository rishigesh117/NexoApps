/**
 * Developer Workspace Service
 * NexoApps Platform - Phase 4C
 */

const authService = require('./auth.service');
const appService = require('./app.service');

class DeveloperWorkspaceService {
  constructor() {
    this.applications = [
      {
        id: 'dev-app-1',
        userId: 'usr-demo-1',
        studioName: 'Batlytics Studio',
        displayName: 'Batlytics Dev',
        country: 'India',
        website: 'https://batlytics.com',
        supportEmail: 'developer@batlytics.com',
        bio: 'Creators of high-precision cricket scoring & sports performance engines.',
        portfolioUrl: 'https://github.com/batlytics',
        status: 'Approved',
        createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
        reviewedAt: new Date(Date.now() - 86400000 * 29).toISOString(),
      },
    ];

    this.profiles = [
      {
        id: 'dev-prof-1',
        userId: 'usr-demo-1',
        studioName: 'Batlytics Studio',
        displayName: 'Batlytics Dev',
        username: 'batlytics',
        bio: 'Creators of high-precision cricket scoring & sports performance engines.',
        country: 'India',
        website: 'https://batlytics.com',
        supportEmail: 'developer@batlytics.com',
        logoUrl: '🏏',
        bannerUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop',
        socialLinks: { twitter: 'https://twitter.com/batlytics', github: 'https://github.com/batlytics' },
        portfolioUrl: 'https://batlytics.com',
        status: 'Verified',
        isVerified: true,
        totalApps: 3,
        followersCount: 1420,
        createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
      },
      {
        id: 'dev-prof-2',
        userId: 'usr-nexo-owner',
        studioName: 'Nexo Platform Studio',
        displayName: 'Nexo Developer',
        username: 'nexoapps',
        bio: 'Official core developer team behind NexoApps Platform.',
        country: 'United States',
        website: 'https://nexoapps.com',
        supportEmail: 'developer@nexoapps.com',
        logoUrl: '🚀',
        bannerUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
        socialLinks: { twitter: 'https://twitter.com/nexoapps' },
        portfolioUrl: 'https://nexoapps.com',
        status: 'Verified',
        isVerified: true,
        totalApps: 5,
        followersCount: 3890,
        createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
      },
    ];
  }

  // Apply to become a Developer
  applyForDeveloper(user, data) {
    if (!data.studioName || !data.supportEmail || !data.bio) {
      throw new Error('Studio Name, Support Email, and Bio are required');
    }

    const existing = this.applications.find((a) => a.userId === user.id);
    if (existing && existing.status === 'Pending') {
      throw new Error('You already have a pending developer application.');
    }

    const newApp = {
      id: `dev-app-${Date.now()}`,
      userId: user.id,
      studioName: data.studioName,
      displayName: data.displayName || data.studioName,
      country: data.country || 'United States',
      website: data.website || '',
      supportEmail: data.supportEmail,
      bio: data.bio,
      portfolioUrl: data.portfolioUrl || '',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    this.applications.unshift(newApp);
    return newApp;
  }

  // Get application status for logged-in user
  getDeveloperApplicationStatus(userId) {
    return this.applications.find((a) => a.userId === userId) || null;
  }

  // Get developer profile by userId or username
  getProfileByUserId(userId) {
    return this.profiles.find((p) => p.userId === userId) || null;
  }

  getProfileByUsername(username) {
    const prof = this.profiles.find((p) => p.username.toLowerCase() === username.toLowerCase());
    if (!prof) return null;

    const publishedApps = appService.getAllApps().filter(
      (a) => a.developer.name.toLowerCase().includes(prof.studioName.toLowerCase()) || a.developer.email === prof.supportEmail
    );

    return {
      ...prof,
      publishedApps,
    };
  }

  // Update Profile
  updateProfile(userId, data) {
    let prof = this.profiles.find((p) => p.userId === userId);
    if (!prof) {
      prof = {
        id: `dev-prof-${Date.now()}`,
        userId,
        studioName: data.studioName || 'Studio Developer',
        displayName: data.displayName || 'Developer',
        username: (data.displayName || 'developer').toLowerCase().replace(/[^a-z0-9]+/g, ''),
        bio: data.bio || '',
        country: data.country || 'United States',
        website: data.website || '',
        supportEmail: data.supportEmail || 'support@nexoapps.com',
        logoUrl: data.logoUrl || '📱',
        bannerUrl: data.bannerUrl || '',
        socialLinks: data.socialLinks || {},
        portfolioUrl: data.portfolioUrl || '',
        status: 'Verified',
        isVerified: true,
        totalApps: 1,
        followersCount: 12,
        createdAt: new Date().toISOString(),
      };
      this.profiles.push(prof);
    } else {
      Object.assign(prof, data);
    }
    return prof;
  }

  // Get Developer Stats
  getDeveloperStats(userId) {
    const myApps = appService.getAllApps();
    const totalDownloads = myApps.reduce((acc, a) => acc + (a.downloads || a.downloadsCount || 0), 0);
    const totalReviews = myApps.reduce((acc, a) => acc + (a.totalReviews || 0), 0);

    return {
      myAppsCount: myApps.length,
      draftAppsCount: appService.getDraftApps().length,
      publishedAppsCount: appService.getPublishedApps().length,
      archivedAppsCount: appService.getArchivedApps().length,
      totalDownloads,
      totalViews: totalDownloads * 3 + 800,
      totalReviews,
      averageRating: 4.9,
      monthlyGrowthPercentage: 28.5,
    };
  }
}

module.exports = new DeveloperWorkspaceService();
