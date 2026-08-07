/**
 * Marketplace Search Service — NexoApps Phase 9C
 * Package query filtering, tags, pricing model filters & sorting engine.
 */

const marketplaceService = require('./marketplace.service');

class MarketplaceSearchService {
  async searchMarketplace(query, itemType, category, pricingModel) {
    let items = await marketplaceService.listItems(itemType, category);

    if (query) {
      const q = query.toLowerCase();
      items = items.filter(i => 
        i.title.toLowerCase().includes(q) || 
        (i.shortDescription && i.shortDescription.toLowerCase().includes(q))
      );
    }

    if (pricingModel && pricingModel !== 'All') {
      items = items.filter(i => i.pricingModel === pricingModel);
    }

    return items;
  }
}

module.exports = new MarketplaceSearchService();
