/**
 * Global AI Search Engine Service
 * NexoApps Platform - Phase 5A
 */

const appService = require('./app.service');

class SearchEngineService {
  constructor() {
    this.popularTerms = [
      { query: 'Batlytics', searchCount: 1420, trend: 'up' },
      { query: 'Cricket Scoring', searchCount: 980, trend: 'up' },
      { query: 'AI Utilities', searchCount: 750, trend: 'stable' },
      { query: 'Sports Analytics', searchCount: 620, trend: 'up' },
      { query: 'Tournament Manager', searchCount: 410, trend: 'stable' },
    ];
    this.userHistories = new Map();
  }

  globalSearch(query, options = {}) {
    const {
      category,
      sort = 'relevance',
      rating,
      downloads,
      platform,
      page = 1,
      limit = 12,
    } = options;

    let apps = appService.getAllApps();

    // 1. Semantic / Fuzzy Query Filtering
    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      apps = apps.filter((a) => {
        const inTitle = a.title.toLowerCase().includes(q);
        const inSlug = a.slug.toLowerCase().includes(q);
        const inDesc = a.description.toLowerCase().includes(q);
        const inDev = a.developer?.name?.toLowerCase().includes(q);
        const inTags = a.tags && a.tags.some((t) => t.toLowerCase().includes(q));
        const inCat = a.category.toLowerCase().includes(q);
        return inTitle || inSlug || inDesc || inDev || inTags || inCat;
      });
    }

    // 2. Category Filter
    if (category && category !== 'All') {
      apps = apps.filter((a) => a.category.toLowerCase() === category.toLowerCase());
    }

    // 3. Minimum Rating Filter
    if (rating) {
      const minRating = parseFloat(rating);
      apps = apps.filter((a) => (a.rating || 0) >= minRating);
    }

    // 4. Sort Engine
    if (sort === 'rating') {
      apps.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === 'downloads') {
      apps.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
    } else if (sort === 'latest') {
      apps.sort((a, b) => new Date(b.lastUpdated || b.releaseDate || 0).getTime() - new Date(a.lastUpdated || a.releaseDate || 0).getTime());
    }

    // 5. Pagination
    const total = apps.length;
    const startIndex = (page - 1) * limit;
    const paginatedApps = apps.slice(startIndex, startIndex + limit);

    // Mock multi-entity matching developers & collections
    const developers = [
      {
        id: 'dev-batlytics',
        studioName: 'Batlytics Studio',
        displayName: 'Batlytics Dev',
        username: 'batlytics',
        bio: 'Creators of high-precision cricket scoring & sports performance engines.',
        country: 'India',
        status: 'Verified',
        isVerified: true,
        totalApps: 3,
        createdAt: new Date().toISOString(),
      },
    ].filter((d) => !query || d.studioName.toLowerCase().includes(query.toLowerCase()) || d.username.toLowerCase().includes(query.toLowerCase()));

    const collections = [
      {
        id: 'coll-1',
        userId: 'usr-1',
        title: 'Top AI & Productivity Apps 2026',
        description: 'Handpicked tools for high performance',
        visibility: 'Public',
        category: 'AI Utilities',
        createdAt: new Date().toISOString(),
      },
    ];

    return {
      apps: paginatedApps,
      developers,
      collections,
      suggestions: this.getSuggestions(query),
      trending: this.popularTerms.map((t) => t.query),
      total,
    };
  }

  getSuggestions(query) {
    if (!query || !query.trim()) return this.popularTerms.map((t) => t.query);
    const q = query.toLowerCase().trim();
    const apps = appService.getAllApps();
    const suggestions = new Set();

    apps.forEach((a) => {
      if (a.title.toLowerCase().includes(q)) suggestions.add(a.title);
      if (a.category.toLowerCase().includes(q)) suggestions.add(a.category);
      if (a.developer?.name && a.developer.name.toLowerCase().includes(q)) suggestions.add(a.developer.name);
    });

    return Array.from(suggestions).slice(0, 5);
  }
}

module.exports = new SearchEngineService();
