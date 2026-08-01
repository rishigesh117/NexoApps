/**
 * Submission Queue & Owner Review Panel Service
 * NexoApps Platform - Phase 4C
 */

const appService = require('./app.service');
const developerWorkspaceService = require('./developer_workspace.service');

class SubmissionQueueService {
  constructor() {
    this.submissions = [
      {
        id: 'sub-001',
        appId: 'batlytics-001',
        developerId: 'dev-prof-1',
        submissionType: 'New Release',
        appTitle: 'Batlytics',
        versionName: '1.0.0-beta',
        buildNumber: 1,
        category: 'Android Apps',
        changesSummary: 'Initial production build submission for cricket scoring engine.',
        status: 'Approved',
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        reviewedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
        developer: {
          studioName: 'Batlytics Studio',
          displayName: 'Batlytics Dev',
          email: 'developer@batlytics.com',
        },
      },
    ];

    this.comments = [
      {
        id: 'comm-1',
        submissionId: 'sub-001',
        authorId: 'admin-1',
        authorName: 'Platform Owner',
        authorRole: 'OWNER',
        commentText: 'Verified SHA-256 binary checksum and clean APK execution. Approved for catalog publication.',
        createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
      },
    ];
  }

  // Submit App for Review
  submitAppForReview(developerUser, data) {
    if (!data.appTitle || !data.versionName) {
      throw new Error('Application Title and Version Name are required for submission.');
    }

    const newSub = {
      id: `sub-${Date.now()}`,
      appId: data.appId || `app-${Date.now()}`,
      developerId: developerUser.id,
      submissionType: data.submissionType || 'New Release',
      appTitle: data.appTitle,
      versionName: data.versionName,
      buildNumber: Number(data.buildNumber) || 1,
      category: data.category || 'Android Apps',
      changesSummary: data.changesSummary || 'Build update submission.',
      status: 'Pending Review',
      createdAt: new Date().toISOString(),
      developer: {
        studioName: data.studioName || developerUser.username,
        displayName: developerUser.username,
        email: developerUser.email,
      },
    };

    this.submissions.unshift(newSub);
    return newSub;
  }

  // Get Submissions Queue for Admin/Owner Review Panel
  getSubmissionQueue(filterStatus) {
    let list = this.submissions;
    if (filterStatus) {
      list = list.filter((s) => s.status === filterStatus);
    }
    return list;
  }

  // Review Submission (Approve / Reject / Request Changes)
  reviewSubmission(adminUser, submissionId, { action, reason }) {
    const sub = this.submissions.find((s) => s.id === submissionId);
    if (!sub) throw new Error('Submission record not found');

    sub.reviewedAt = new Date().toISOString();

    if (action === 'approve') {
      sub.status = 'Approved';
      // Automatically update/publish live app
      try {
        appService.publishApp(sub.appId);
      } catch {
        // Create live app if not existing
        appService.createUploadApp({
          id: sub.appId,
          title: sub.appTitle,
          version: sub.versionName,
          buildNumber: sub.buildNumber,
          category: sub.category,
          status: 'Published',
          isDraft: false,
        });
      }
    } else if (action === 'reject') {
      sub.status = 'Rejected';
      sub.rejectionReason = reason || 'Does not meet NexoApps catalog publishing guidelines.';
    } else if (action === 'changes_requested') {
      sub.status = 'Changes Requested';
      sub.rejectionReason = reason || 'Modifications required before approval.';
    }

    if (reason) {
      this.addComment(submissionId, adminUser, reason);
    }

    return sub;
  }

  // Comments / Discussion Thread
  addComment(submissionId, user, commentText) {
    const comment = {
      id: `comm-${Date.now()}`,
      submissionId,
      authorId: user.id,
      authorName: user.username || 'Reviewer',
      authorRole: user.role || 'ADMIN',
      commentText,
      createdAt: new Date().toISOString(),
    };
    this.comments.push(comment);
    return comment;
  }

  getCommentsForSubmission(submissionId) {
    return this.comments.filter((c) => c.submissionId === submissionId);
  }
}

module.exports = new SubmissionQueueService();
