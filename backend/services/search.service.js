/**
 * Advanced Search & Autocomplete Service
 * NexoApps Platform - Phase 4E
 */

const appService = require('./app.service');

class SearchService {
  constructor() {
    this.searchHistory = ['Batlytics', 'Cricket Scoring', 'AI Utilities', 'Android Apps'];
    this.popularSearches = ['Batlytics', 'Cricket', 'Scoring Engine', 'AI Studio', 'Utilities'];
  }

  searchCatalog(query, { category, developer, tag } = {}) {
    let apps = appService.getAllApps();

    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      apps = apps.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.slug.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.developer?.name?.toLowerCase().includes(q) ||
          (a.tags && a.tags.some((t) => t.toLowerCase().includes(q)))
      );

      // Track history
      if (!this.searchHistory.includes(query.trim())) {
        this.searchHistory.unshift(query.trim());
        if (this.searchHistory.length > 20) this.searchHistory.pop();
      }
    }

    if (category) {
      apps = apps.filter((a) => a.category.toLowerCase() === category.toLowerCase());
    }

    if (developer) {
      apps = apps.filter((a) => a.developer?.name?.toLowerCase().includes(developer.toLowerCase()));
    }

    if (tag) {
      apps = apps.filter((a) => a.tags && a.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()));
    }

    return {
      results: apps,
      total: apps.length,
      popularSearches: this.popularSearches,
    };
  }

  getAutocompleteSuggestions(query) {
    if (!query || !query.trim()) return [];
    const q = query.toLowerCase().trim();
    const apps = appService.getAllApps();

    const suggestions = new Set();
    apps.forEach((a) => {
      if (a.title.toLowerCase().includes(q)) suggestions.add(a.title);
      if (a.developer?.name && a.developer.name.toLowerCase().includes(q)) suggestions.add(a.developer.name);
      if (a.category.toLowerCase().includes(q)) suggestions.add(a.category);
    });

    return Array.from(suggestions).slice(0, 6);
  }
}

module.exports = new SearchService();
