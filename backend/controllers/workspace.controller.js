/**
 * Workspace Controller
 * NexoApps Platform - Phase 5D
 */

const workspaceService = require('../services/workspace.service');
const activityService = require('../services/activity.service');

exports.getOverview = async (req, res, next) => {
  try {
    const overview = workspaceService.getWorkspaceOverview(req.user?.id);
    return res.status(200).json({
      success: true,
      data: overview,
    });
  } catch (err) {
    next(err);
  }
};

exports.getActivityFeed = async (req, res, next) => {
  try {
    const { orgId } = req.query;
    const activities = activityService.getActivityFeed(orgId || 'org-101');
    return res.status(200).json({
      success: true,
      data: activities,
    });
  } catch (err) {
    next(err);
  }
};

exports.getApiKeys = async (req, res, next) => {
  try {
    const { orgId } = req.query;
    const keys = activityService.getApiKeys(orgId || 'org-101');
    return res.status(200).json({
      success: true,
      data: keys,
    });
  } catch (err) {
    next(err);
  }
};

exports.createApiKey = async (req, res, next) => {
  try {
    const { orgId, keyName, permissions } = req.body;
    const newKey = activityService.createApiKey(orgId || 'org-101', keyName, permissions);
    return res.status(201).json({
      success: true,
      data: newKey,
    });
  } catch (err) {
    next(err);
  }
};
