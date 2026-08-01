/**
 * Project Controller
 * NexoApps Platform - Phase 5D
 */

const projectService = require('../services/project.service');

exports.getProjects = async (req, res, next) => {
  try {
    const { orgId } = req.query;
    const projects = projectService.getProjects(orgId || 'org-101');
    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (err) {
    next(err);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const { orgId } = req.body;
    const project = projectService.createProject(orgId || 'org-101', req.body, req.user?.id);
    return res.status(201).json({
      success: true,
      data: project,
    });
  } catch (err) {
    next(err);
  }
};
