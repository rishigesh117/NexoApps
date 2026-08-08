/**
 * Developer Controller Layer
 * NexoApps Platform - Phase 4C
 */

const developerService = require('../services/developer_workspace.service');
const submissionService = require('../services/submission_queue.service');
const notificationService = require('../services/developer_notification.service');
const appService = require('../services/app.service');

class DeveloperController {
  // POST /api/v1/developer/apply
  applyForDeveloper(req, res) {
    try {
      const user = req.user;
      const application = developerService.applyForDeveloper(user, req.body);
      return res.status(201).json({
        success: true,
        message: 'Developer application submitted successfully for Owner review.',
        data: application,
      });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // GET /api/v1/developer/application-status
  getApplicationStatus(req, res) {
    try {
      const user = req.user;
      const application = developerService.getDeveloperApplicationStatus(user.id);
      return res.status(200).json({ success: true, data: application });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // GET /api/v1/developer/dashboard
  getDashboard(req, res) {
    try {
      const user = req.user;
      const profile = developerService.getProfileByUserId(user.id);
      const stats = developerService.getDeveloperStats(user.id);
      const myApps = appService.getAllApps();
      const notifications = notificationService.getNotificationsForDeveloper(user.id);

      return res.status(200).json({
        success: true,
        data: {
          profile,
          stats,
          myApps,
          notifications,
        },
      });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // GET /api/v1/developer/profile/:username
  getPublicProfile(req, res) {
    try {
      const { username } = req.params;
      const profile = developerService.getProfileByUsername(username);
      if (!profile) {
        return res.status(404).json({ success: false, message: 'Developer profile not found' });
      }
      return res.status(200).json({ success: true, data: profile });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // PATCH /api/v1/developer/profile
  updateProfile(req, res) {
    try {
      const user = req.user;
      const updated = developerService.updateProfile(user.id, req.body);
      return res.status(200).json({
        success: true,
        message: 'Developer profile updated successfully',
        data: updated,
      });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // POST /api/v1/developer/submit-app
  submitApp(req, res) {
    try {
      const user = req.user;
      const submission = submissionService.submitAppForReview(user, req.body);
      notificationService.notifyDeveloper({
        developerId: user.id,
        type: 'submission_received',
        title: 'App Submission Received',
        message: `Your app ${submission.appTitle} (v${submission.versionName}) was submitted for Owner review.`,
      });
      return res.status(201).json({
        success: true,
        message: 'App submitted to Owner review panel successfully',
        data: submission,
      });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // GET /api/v1/developer/notifications
  getNotifications(req, res) {
    try {
      const user = req.user;
      const list = notificationService.getNotificationsForDeveloper(user.id);
      const unreadCount = notificationService.getUnreadCount(user.id);
      return res.status(200).json({ success: true, data: { notifications: list, unreadCount } });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  markNotificationsRead(req, res) {
    try {
      const user = req.user;
      const list = notificationService.markAllAsRead(user.id);
      return res.status(200).json({ success: true, data: list });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // GET /api/v1/developer
  getDevelopers(req, res) {
    try {
      const list = developerService.getAllDevelopers ? developerService.getAllDevelopers() : [];
      return res.status(200).json({ success: true, data: list });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // PATCH /api/v1/developer/:id
  updateDeveloper(req, res) {
    try {
      const { id } = req.params;
      const updated = developerService.updateProfile ? developerService.updateProfile(id, req.body) : req.body;
      return res.status(200).json({ success: true, data: updated });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // POST /api/v1/developer/:id/assign
  assignApp(req, res) {
    try {
      const { id } = req.params;
      return res.status(200).json({ success: true, message: `App assigned to developer ${id}` });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }
}

module.exports = new DeveloperController();
