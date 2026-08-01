/**
 * Admin Controller Layer
 * NexoApps Platform - Phase 3E
 */

const adminService = require('../services/admin.service');
const appService = require('../services/app.service');

class AdminController {
  // GET /api/v1/admin/users
  getUsers(req, res) {
    try {
      const { search, role, status } = req.query;
      const users = adminService.getAllUsers({ search, role, status });
      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // PATCH /api/v1/admin/users/:id
  updateUser(req, res) {
    try {
      const { id } = req.params;
      const adminUser = req.user;
      const updated = adminService.updateUser(adminUser, id, req.body);
      return res.status(200).json({
        success: true,
        message: 'User account updated successfully',
        data: updated,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // GET /api/v1/admin/apps
  getApps(req, res) {
    try {
      const apps = appService.getAllApps();
      return res.status(200).json({
        success: true,
        data: apps,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // POST /api/v1/admin/apps
  createApp(req, res) {
    try {
      const adminUser = req.user;
      const newApp = appService.createApp(req.body);
      adminService.logActivity(
        adminUser,
        'App Created',
        'App',
        newApp.id,
        `Created app ${newApp.title}`
      );
      return res.status(201).json({
        success: true,
        message: 'App created successfully',
        data: newApp,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // PATCH /api/v1/admin/apps/:id
  updateApp(req, res) {
    try {
      const { id } = req.params;
      const adminUser = req.user;
      const updated = appService.updateApp(id, req.body);
      adminService.logActivity(
        adminUser,
        'App Updated',
        'App',
        id,
        `Updated app properties for ${updated.title}`
      );
      return res.status(200).json({
        success: true,
        message: 'App updated successfully',
        data: updated,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // DELETE /api/v1/admin/apps/:id
  deleteApp(req, res) {
    try {
      const { id } = req.params;
      const adminUser = req.user;
      const result = appService.deleteApp(id);
      adminService.logActivity(
        adminUser,
        'App Deleted',
        'App',
        id,
        `Admin deleted application ID ${id}`
      );
      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // GET /api/v1/admin/reviews
  getReviews(req, res) {
    try {
      const reviews = adminService.getAllReviews();
      return res.status(200).json({
        success: true,
        data: reviews,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // GET /api/v1/admin/downloads
  getDownloads(req, res) {
    try {
      const downloads = adminService.getAllDownloads();
      return res.status(200).json({
        success: true,
        data: downloads,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Phase 4A: POST /api/v1/admin/apps/upload
  uploadApp(req, res) {
    try {
      const adminUser = req.user;
      const uploadedApp = appService.createUploadApp(req.body);
      adminService.logActivity(
        adminUser,
        uploadedApp.isDraft ? 'App Draft Saved' : 'App Uploaded & Published',
        'App',
        uploadedApp.id,
        `${uploadedApp.isDraft ? 'Saved draft for' : 'Uploaded app'} ${uploadedApp.title} (v${uploadedApp.version})`
      );
      return res.status(201).json({
        success: true,
        message: uploadedApp.isDraft ? 'App draft saved successfully' : 'App uploaded & published successfully',
        data: uploadedApp,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Phase 4A: POST /api/v1/admin/apps/:id/publish
  publishApp(req, res) {
    try {
      const { id } = req.params;
      const adminUser = req.user;
      const published = appService.publishApp(id);
      adminService.logActivity(
        adminUser,
        'App Published',
        'App',
        id,
        `Published application ${published.title}`
      );
      return res.status(200).json({
        success: true,
        message: 'App published to store successfully',
        data: published,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Phase 4A: POST /api/v1/admin/apps/:id/archive
  archiveApp(req, res) {
    try {
      const { id } = req.params;
      const adminUser = req.user;
      const archived = appService.archiveApp(id);
      adminService.logActivity(
        adminUser,
        'App Archived',
        'App',
        id,
        `Archived application ${archived.title}`
      );
      return res.status(200).json({
        success: true,
        message: 'App archived successfully',
        data: archived,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Phase 4A: GET /api/v1/admin/apps/drafts
  getDraftApps(req, res) {
    try {
      const drafts = appService.getDraftApps();
      return res.status(200).json({
        success: true,
        data: drafts,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Phase 4A: GET /api/v1/admin/apps/published
  getPublishedApps(req, res) {
    try {
      const published = appService.getPublishedApps();
      return res.status(200).json({
        success: true,
        data: published,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Phase 4A: GET /api/v1/admin/apps/archived
  getArchivedApps(req, res) {
    try {
      const archived = appService.getArchivedApps();
      return res.status(200).json({
        success: true,
        data: archived,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Phase 4A: GET /api/v1/admin/apps/owner-stats
  getOwnerStats(req, res) {
    try {
      const stats = appService.getOwnerStats();
      return res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = new AdminController();
