/**
 * Admin Service Layer
 * NexoApps Platform - Phase 3E
 */

const authService = require('./auth.service');
const reviewService = require('./review.service');
const downloadService = require('./download.service');

class AdminService {
  constructor() {
    this.activityLogs = [
      {
        id: 'act-1',
        adminId: 'admin-001',
        adminName: 'Platform Administrator',
        action: 'System Startup',
        targetType: 'System',
        targetId: 'sys-001',
        details: 'Admin Dashboard Engine initialized successfully',
        ipAddress: '127.0.0.1',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'act-2',
        adminId: 'admin-001',
        adminName: 'Platform Administrator',
        action: 'Developer Verified',
        targetType: 'Developer',
        targetId: 'dev-batlytics',
        details: 'Verified developer badge granted to Batlytics Studio',
        ipAddress: '127.0.0.1',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
    ];

    this.users = [
      {
        id: 'usr-admin-1',
        username: 'admin',
        email: 'admin@nexoapps.com',
        role: 'ADMIN',
        emailVerified: true,
        status: 'Active',
        totalDownloads: 24,
        totalReviews: 5,
        createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
      },
      {
        id: 'usr-demo-1',
        username: 'Alex Turner',
        email: 'alex@example.com',
        role: 'MEMBER',
        emailVerified: true,
        status: 'Active',
        totalDownloads: 12,
        totalReviews: 3,
        createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
      },
      {
        id: 'usr-demo-2',
        username: 'Priya Sharma',
        email: 'priya@example.com',
        role: 'MEMBER',
        emailVerified: true,
        status: 'Active',
        totalDownloads: 8,
        totalReviews: 2,
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      },
    ];
  }

  // Log admin activity
  logActivity(adminUser, action, targetType, targetId, details, ipAddress = '127.0.0.1') {
    const log = {
      id: `act-${Date.now()}`,
      adminId: adminUser?.id || 'admin-001',
      adminName: adminUser?.username || 'Platform Admin',
      action,
      targetType,
      targetId,
      details,
      ipAddress,
      createdAt: new Date().toISOString(),
    };
    this.activityLogs.unshift(log);
    return log;
  }

  // Get audit activity logs
  getActivityLogs(limit = 20) {
    return this.activityLogs.slice(0, limit);
  }

  // Get user accounts list for admin
  getAllUsers(options = {}) {
    const { search, role, status } = options;
    let list = [...this.users];

    if (role) {
      list = list.filter((u) => u.role === role);
    }

    if (status) {
      list = list.filter((u) => u.status === status);
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (u) =>
          u.username.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }

    return list;
  }

  // Update user status or role
  updateUser(adminUser, userId, updates) {
    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      throw new Error('User account not found');
    }

    if (updates.status && ['Active', 'Suspended'].includes(updates.status)) {
      user.status = updates.status;
      this.logActivity(
        adminUser,
        'User Status Updated',
        'User',
        user.id,
        `User ${user.email} status changed to ${updates.status}`
      );
    }

    if (updates.role && ['MEMBER', 'ADMIN'].includes(updates.role)) {
      user.role = updates.role;
      this.logActivity(
        adminUser,
        'User Role Updated',
        'User',
        user.id,
        `User ${user.email} promoted to ${updates.role}`
      );
    }

    return user;
  }

  // Get all reviews for admin moderation
  getAllReviews() {
    return reviewService.reviews || [];
  }

  // Moderate/delete review as admin
  moderateReview(adminUser, reviewId, action) {
    const review = reviewService.reviews.find((r) => r.id === reviewId);
    if (!review) {
      throw new Error('Review not found');
    }

    if (action === 'delete') {
      review.isDeleted = true;
      this.logActivity(
        adminUser,
        'Review Deleted',
        'Review',
        reviewId,
        `Admin deleted review "${review.title}" by ${review.userName}`
      );
    }

    return review;
  }

  // Get all download records for admin monitoring
  getAllDownloads() {
    return downloadService.downloads || [];
  }
}

module.exports = new AdminService();
