/**
 * App Controller
 * NexoApps Platform
 */

const { successResponse, errorResponse } = require('../utils/responseHandler');
const appService = require('../services/app.service');

exports.getAllApps = async (req, res, next) => {
  try {
    const apps = appService.getApps(req.query);
    return successResponse(res, apps, 'Fetched apps successfully');
  } catch (err) {
    next(err);
  }
};

exports.getFeaturedApps = async (req, res, next) => {
  try {
    const apps = appService.getFeaturedApps();
    return successResponse(res, apps, 'Fetched featured apps successfully');
  } catch (err) {
    next(err);
  }
};

exports.getTrendingApps = async (req, res, next) => {
  try {
    const apps = appService.getTrendingApps();
    return successResponse(res, apps, 'Fetched trending apps successfully');
  } catch (err) {
    next(err);
  }
};

exports.getNewApps = async (req, res, next) => {
  try {
    const apps = appService.getNewApps();
    return successResponse(res, apps, 'Fetched new apps successfully');
  } catch (err) {
    next(err);
  }
};

exports.searchApps = async (req, res, next) => {
  try {
    const { q } = req.query;
    const result = appService.searchApps(q);
    return successResponse(res, result, 'Search completed successfully');
  } catch (err) {
    next(err);
  }
};

exports.getCategoryApps = async (req, res, next) => {
  try {
    const { category } = req.params;
    const apps = appService.getAppsByCategory(category);
    return successResponse(res, apps, `Fetched apps for category ${category}`);
  } catch (err) {
    next(err);
  }
};

exports.getAppBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const app = appService.getAppBySlug(slug);
    if (!app) {
      return errorResponse(res, 'Application not found', 404);
    }
    return successResponse(res, app, 'Fetched app details successfully');
  } catch (err) {
    next(err);
  }
};

exports.getRelatedApps = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const apps = appService.getRelatedApps(slug);
    return successResponse(res, apps, 'Fetched related apps successfully');
  } catch (err) {
    next(err);
  }
};

exports.getChangelog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const changelog = appService.getChangelog(slug);
    return successResponse(res, changelog, 'Fetched app changelog successfully');
  } catch (err) {
    next(err);
  }
};

exports.getVersionHistory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const versions = appService.getVersionHistory(slug);
    return successResponse(res, versions, 'Fetched version history successfully');
  } catch (err) {
    next(err);
  }
};
