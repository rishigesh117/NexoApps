/**
 * User Collections & App Playlists Service
 * NexoApps Platform - Phase 4D
 */

const appService = require('./app.service');

class CollectionService {
  constructor() {
    this.collections = [
      {
        id: 'coll-favs',
        userId: 'usr-demo-1',
        title: 'Essential Productivity & Sports',
        description: 'Handpicked daily essential utilities and performance scoring tools.',
        visibility: 'Public',
        category: 'Utilities',
        coverImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600&auto=format&fit=crop',
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
        apps: [],
      },
    ];

    this.collectionItems = [
      { id: 'item-1', collectionId: 'coll-favs', appId: 'batlytics-001', sortOrder: 0, addedAt: new Date().toISOString() },
    ];
  }

  getUserCollections(userId) {
    const list = this.collections.filter((c) => c.userId === userId || c.visibility === 'Public');
    return list.map((c) => this.populateCollection(c));
  }

  getCollectionById(id) {
    const c = this.collections.find((item) => item.id === id);
    if (!c) return null;
    return this.populateCollection(c);
  }

  createCollection(userId, data) {
    if (!data.title) throw new Error('Collection title is required');

    const newColl = {
      id: `coll-${Date.now()}`,
      userId,
      title: data.title,
      description: data.description || '',
      visibility: data.visibility || 'Public',
      category: data.category || 'Favorites',
      coverImage: data.coverImage || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600&auto=format&fit=crop',
      createdAt: new Date().toISOString(),
    };

    this.collections.unshift(newColl);
    return this.populateCollection(newColl);
  }

  updateCollection(id, userId, data) {
    const coll = this.collections.find((c) => c.id === id && c.userId === userId);
    if (!coll) throw new Error('Collection not found or access denied');

    Object.assign(coll, data);
    return this.populateCollection(coll);
  }

  deleteCollection(id, userId) {
    const idx = this.collections.findIndex((c) => c.id === id && c.userId === userId);
    if (idx !== -1) {
      this.collections.splice(idx, 1);
      this.collectionItems = this.collectionItems.filter((i) => i.collectionId !== id);
    }
    return { success: true };
  }

  addAppToCollection(collectionId, userId, appId) {
    const coll = this.collections.find((c) => c.id === collectionId && c.userId === userId);
    if (!coll) throw new Error('Collection not found or access denied');

    const existing = this.collectionItems.find((i) => i.collectionId === collectionId && i.appId === appId);
    if (existing) return existing;

    const item = {
      id: `item-${Date.now()}`,
      collectionId,
      appId,
      sortOrder: this.collectionItems.filter((i) => i.collectionId === collectionId).length,
      addedAt: new Date().toISOString(),
    };

    this.collectionItems.push(item);
    return item;
  }

  removeAppFromCollection(collectionId, userId, appId) {
    const coll = this.collections.find((c) => c.id === collectionId && c.userId === userId);
    if (!coll) throw new Error('Collection not found or access denied');

    this.collectionItems = this.collectionItems.filter((i) => !(i.collectionId === collectionId && i.appId === appId));
    return { success: true };
  }

  populateCollection(coll) {
    const items = this.collectionItems.filter((i) => i.collectionId === coll.id);
    const allApps = appService.getAllApps();
    const apps = items
      .map((i) => allApps.find((a) => a.id === i.appId || a.slug === i.appId))
      .filter(Boolean);

    return {
      ...coll,
      itemCount: items.length,
      apps,
    };
  }
}

module.exports = new CollectionService();
