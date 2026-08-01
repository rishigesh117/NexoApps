/**
 * Community Activity Feed Service
 * NexoApps Platform - Phase 4D
 */

const appService = require('./app.service');

class CommunityService {
  constructor() {
    this.feedItems = [
      {
        id: 'feed-1',
        type: 'new_release',
        title: 'Batlytics 1.0.0-beta Released',
        content: 'Batlytics Studio released v1.0.0-beta featuring ball-by-ball live scoring & PDF export.',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        developer: {
          studioName: 'Batlytics Studio',
          username: 'batlytics',
          logoUrl: '🏏',
        },
      },
      {
        id: 'feed-2',
        type: 'featured_promotion',
        title: 'NexoApps Featured Showcase',
        content: 'Batlytics has been selected for the NexoApps Editors Choice Showcase.',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        developer: {
          studioName: 'Batlytics Studio',
          username: 'batlytics',
          logoUrl: '🏏',
        },
      },
      {
        id: 'feed-3',
        type: 'review_milestone',
        title: '100+ Reviews Milestone Achieved',
        content: 'Batlytics reached 100+ verified 5-star user reviews with an average score of 4.9 ★.',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        developer: {
          studioName: 'Batlytics Studio',
          username: 'batlytics',
          logoUrl: '🏏',
        },
      },
    ];
  }

  getActivityFeed() {
    const allApps = appService.getAllApps();
    const latestApp = allApps[0];

    return this.feedItems.map((item) => ({
      ...item,
      app: latestApp,
    }));
  }
}

module.exports = new CommunityService();
