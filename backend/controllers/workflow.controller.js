/**
 * Workflow Controller
 * NexoApps Platform — Version 8.3 (Phase 11C)
 */

const workflowBuilderService = require('../services/workflow_builder.service');
const workflowEngineService = require('../services/workflow_engine.service');

// Legacy exports
exports.getWorkflows = async (req, res, next) => {
  try {
    const workflows = workflowBuilderService.getWorkflows(req.user?.id);
    return res.status(200).json({ success: true, data: workflows });
  } catch (err) {
    next(err);
  }
};

exports.createWorkflow = async (req, res, next) => {
  try {
    const workflow = workflowBuilderService.createWorkflow(req.user?.id, req.body);
    return res.status(201).json({ success: true, data: workflow });
  } catch (err) {
    next(err);
  }
};

exports.listTemplates = async (req, res) => {
  try {
    const templates = await workflowEngineService.listTemplates(req.query.tenantId || 'default');
    res.json({ success: true, data: templates });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listInstances = async (req, res) => {
  try {
    const instances = await workflowEngineService.listInstances(req.query.tenantId || 'default');
    res.json({ success: true, data: instances });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getInstance = async (req, res) => {
  try {
    const instance = await workflowEngineService.getInstance(req.params.id);
    res.json({ success: true, data: instance });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createInstance = async (req, res) => {
  try {
    const instance = await workflowEngineService.createInstance(req.body);
    res.status(201).json({ success: true, data: instance });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getSteps = async (req, res) => {
  try {
    const steps = await workflowEngineService.getSteps(req.params.id);
    res.json({ success: true, data: steps });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.runWorkflow = async (req, res) => {
  try {
    const run = await workflowEngineService.runWorkflow(req.params.id, req.body);
    res.json({ success: true, data: run });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listRuns = async (req, res) => {
  try {
    const runs = await workflowEngineService.listRuns(req.params.id);
    res.json({ success: true, data: runs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await workflowEngineService.getLogs(req.params.runId);
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── Phase 11C Extensions ───

exports.listEnterpriseWorkflows = async (req, res) => {
  try {
    const workflows = await workflowEngineService.listWorkflows(req.query.projectId);
    res.json({ success: true, data: workflows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getEnterpriseWorkflowById = async (req, res) => {
  try {
    const workflow = await workflowEngineService.getWorkflowById(req.params.id);
    res.json({ success: true, data: workflow });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createEnterpriseWorkflow = async (req, res) => {
  try {
    const workflow = await workflowEngineService.createWorkflow(req.body);
    res.status(201).json({ success: true, data: workflow });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.publishWorkflow = async (req, res) => {
  try {
    const version = await workflowEngineService.publishWorkflowVersion(req.params.id, req.body.changelog);
    res.json({ success: true, data: version });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getWorkflowExecutions = async (req, res) => {
  try {
    const executions = await workflowEngineService.getExecutions(req.params.id);
    res.json({ success: true, data: executions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
