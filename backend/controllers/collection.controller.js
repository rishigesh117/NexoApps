/**
 * Collection Controller Layer
 * NexoApps Platform - Phase 4D
 */

const collectionService = require('../services/collection.service');

class CollectionController {
  // GET /api/v1/collections
  getCollections(req, res) {
    try {
      const userId = req.user?.id;
      const list = collectionService.getUserCollections(userId);
      return res.status(200).json({ success: true, data: list });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // GET /api/v1/collections/:id
  getCollectionById(req, res) {
    try {
      const { id } = req.params;
      const collection = collectionService.getCollectionById(id);
      if (!collection) return res.status(404).json({ success: false, message: 'Collection not found' });
      return res.status(200).json({ success: true, data: collection });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // POST /api/v1/collections
  createCollection(req, res) {
    try {
      const userId = req.user.id;
      const created = collectionService.createCollection(userId, req.body);
      return res.status(201).json({ success: true, message: 'Collection created successfully', data: created });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // PATCH /api/v1/collections/:id
  updateCollection(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const updated = collectionService.updateCollection(id, userId, req.body);
      return res.status(200).json({ success: true, message: 'Collection updated successfully', data: updated });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // DELETE /api/v1/collections/:id
  deleteCollection(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      collectionService.deleteCollection(id, userId);
      return res.status(200).json({ success: true, message: 'Collection deleted successfully' });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // POST /api/v1/collections/:id/apps
  addApp(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const { appId } = req.body;
      const item = collectionService.addAppToCollection(id, userId, appId);
      return res.status(200).json({ success: true, message: 'App added to collection', data: item });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // DELETE /api/v1/collections/:id/apps/:appId
  removeApp(req, res) {
    try {
      const userId = req.user.id;
      const { id, appId } = req.params;
      collectionService.removeAppFromCollection(id, userId, appId);
      return res.status(200).json({ success: true, message: 'App removed from collection' });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }
}

module.exports = new CollectionController();
