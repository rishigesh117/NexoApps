/**
 * Search History & Trends Service
 * NexoApps Platform - Phase 5A
 */

class SearchHistoryService {
  constructor() {
    this.history = [];
    this.popular = [
      { query: 'Batlytics', searchCount: 1420, trend: 'up' },
      { query: 'Cricket Scoring', searchCount: 980, trend: 'up' },
      { query: 'AI Utilities', searchCount: 750, trend: 'stable' },
      { query: 'Sports Analytics', searchCount: 620, trend: 'up' },
    ];
  }

  recordSearch(query, userId = null) {
    if (!query || !query.trim()) return;
    const clean = query.trim();

    this.history.unshift({
      id: `sh-${Date.now()}`,
      query: clean,
      userId,
      createdAt: new Date().toISOString(),
    });
    if (this.history.length > 50) this.history.pop();

    const existing = this.popular.find((p) => p.query.toLowerCase() === clean.toLowerCase());
    if (existing) {
      existing.searchCount += 1;
    } else {
      this.popular.push({ query: clean, searchCount: 1, trend: 'up' });
    }
  }

  getPopularSearches() {
    return this.popular.sort((a, b) => b.searchCount - a.searchCount).slice(0, 8);
  }
}

module.exports = new SearchHistoryService();
