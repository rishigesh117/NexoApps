/**
 * Owner Submission Review Controller
 * NexoApps Platform - Phase 4C
 */

const submissionService = require('../services/submission_queue.service');
const notificationService = require('../services/developer_notification.service');
const adminService = require('../services/admin.service');

class SubmissionController {
  // GET /api/v1/admin/submissions
  getQueue(req, res) {
    try {
      const { status } = req.query;
      const list = submissionService.getSubmissionQueue(status);
      return res.status(200).json({ success: true, data: list });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // POST /api/v1/admin/submissions/:id/review
  reviewSubmission(req, res) {
    try {
      const { id } = req.params;
      const adminUser = req.user;
      const { action, reason } = req.body;

      const reviewed = submissionService.reviewSubmission(adminUser, id, { action, reason });

      // Notify developer
      if (action === 'approve') {
        notificationService.notifyDeveloper({
          developerId: reviewed.developerId,
          type: 'approved',
          title: 'App Submission Approved!',
          message: `Your app ${reviewed.appTitle} (v${reviewed.versionName}) was approved and published live.`,
        });
      } else if (action === 'reject') {
        notificationService.notifyDeveloper({
          developerId: reviewed.developerId,
          type: 'rejected',
          title: 'App Submission Rejected',
          message: `Reason: ${reason || 'Does not comply with catalog guidelines.'}`,
        });
      } else if (action === 'changes_requested') {
        notificationService.notifyDeveloper({
          developerId: reviewed.developerId,
          type: 'needs_changes',
          title: 'App Submission Needs Changes',
          message: `Feedback: ${reason || 'Please address reviewer feedback.'}`,
        });
      }

      adminService.logActivity(
        adminUser,
        `Submission ${action.toUpperCase()}`,
        'Submission',
        id,
        `Owner/Admin ${action} submission for ${reviewed.appTitle}`
      );

      return res.status(200).json({
        success: true,
        message: `Submission ${action} completed successfully`,
        data: reviewed,
      });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // POST /api/v1/admin/submissions/:id/comments
  addComment(req, res) {
    try {
      const { id } = req.params;
      const user = req.user;
      const { commentText } = req.body;
      const comment = submissionService.addComment(id, user, commentText);
      return res.status(201).json({ success: true, data: comment });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // GET /api/v1/admin/submissions/:id/comments
  getComments(req, res) {
    try {
      const { id } = req.params;
      const comments = submissionService.getCommentsForSubmission(id);
      return res.status(200).json({ success: true, data: comments });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }
}

module.exports = new SubmissionController();
