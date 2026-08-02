/**
 * Workflow Controller
 * NexoApps Platform - Phase 6A (Version 2.1)
 */

const workflowBuilderService = require('../services/workflow_builder.service');

exports.getWorkflows = async (req, res, next) => {
  try {
    const workflows = workflowBuilderService.getWorkflows(req.user?.id);
    return res.status(200).json({
      success: true,
      data: workflows,
    });
  } catch (err) {
    next(err);
  }
};

exports.createWorkflow = async (req, res, next) => {
  try {
    const workflow = workflowBuilderService.createWorkflow(req.user?.id, req.body);
    return res.status(201).json({
      success: true,
      data: workflow,
    });
  } catch (err) {
    next(err);
  }
};
