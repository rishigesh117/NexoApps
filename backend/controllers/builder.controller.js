/**
 * AI Builder Controller
 * NexoApps Platform - Phase 6A (Version 2.1)
 */

const aiBuilderService = require('../services/ai_builder.service');
const projectBuilderService = require('../services/project_builder.service');

exports.getProjects = async (req, res, next) => {
  try {
    const projects = aiBuilderService.getProjects(req.user?.id);
    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = aiBuilderService.getProjectById(id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    const files = projectBuilderService.getProjectFiles(id);
    return res.status(200).json({
      success: true,
      data: { project, files },
    });
  } catch (err) {
    next(err);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const project = aiBuilderService.createProject(req.user?.id, req.body);
    return res.status(201).json({
      success: true,
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPromptHistory = async (req, res, next) => {
  try {
    const history = aiBuilderService.getPromptHistory(req.user?.id);
    return res.status(200).json({
      success: true,
      data: history,
    });
  } catch (err) {
    next(err);
  }
};
