/**
 * Platform Automation Controller
 * NexoApps Platform - Version 8.3 (Phase 11C)
 */

const automationService = require('../services/automation.service');
const automationEngineService = require('../services/automation_engine.service');
const automationWorkspaceService = require('../services/automation_workspace.service');
const automationTriggerService = require('../services/automation_trigger.service');
const businessRulesService = require('../services/business_rules.service');
const decisionEngineService = require('../services/decision_engine.service');
const processAnalyticsService = require('../services/process_analytics.service');
const queueService = require('../services/queue.service');
const workerService = require('../services/worker.service');
const schedulerV2Service = require('../services/scheduler_v2.service');

// Legacy exports
exports.getLogs = async (req, res, next) => {
  try {
    const logs = automationService.getLogs();
    return res.status(200).json({ success: true, data: logs });
  } catch (err) {
    next(err);
  }
};

exports.getAuditReport = async (req, res, next) => {
  try {
    const report = automationService.runDiagnosticAudit();
    return res.status(200).json({ success: true, data: report });
  } catch (err) {
    next(err);
  }
};

exports.listJobs = async (req, res) => {
  try {
    const jobs = await automationEngineService.listJobs(req.query.tenantId || 'default');
    res.json({ success: true, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    const job = await automationEngineService.createJob(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.toggleJob = async (req, res) => {
  try {
    const result = await automationEngineService.toggleJob(req.params.id);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listQueues = async (req, res) => {
  try {
    const queues = await queueService.listQueues(req.query.tenantId || 'default');
    res.json({ success: true, data: queues });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createQueue = async (req, res) => {
  try {
    const queue = await queueService.createQueue(req.body);
    res.status(201).json({ success: true, data: queue });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listQueueMessages = async (req, res) => {
  try {
    const messages = await queueService.listMessages(req.params.queueId);
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.purgeQueue = async (req, res) => {
  try {
    const result = await queueService.purgeQueue(req.params.queueId);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listWorkers = async (req, res) => {
  try {
    const workers = await workerService.listWorkers();
    res.json({ success: true, data: workers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listSchedules = async (req, res) => {
  try {
    const schedules = await schedulerV2Service.listSchedules(req.query.tenantId || 'default');
    res.json({ success: true, data: schedules });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── Phase 11C Extensions ───

exports.listWorkspaces = async (req, res) => {
  try {
    const workspaces = await automationWorkspaceService.listWorkspaces(req.query.organizationId);
    res.json({ success: true, data: workspaces });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createWorkspace = async (req, res) => {
  try {
    const workspace = await automationWorkspaceService.createWorkspace(req.body);
    res.status(201).json({ success: true, data: workspace });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listTriggers = async (req, res) => {
  try {
    const triggers = await automationTriggerService.listTriggers(req.query.workflowId);
    res.json({ success: true, data: triggers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createTrigger = async (req, res) => {
  try {
    const trigger = await automationTriggerService.createTrigger(req.body);
    res.status(201).json({ success: true, data: trigger });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listBusinessRules = async (req, res) => {
  try {
    const rules = await businessRulesService.listRules(req.query.group);
    res.json({ success: true, data: rules });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createBusinessRule = async (req, res) => {
  try {
    const rule = await businessRulesService.createRule(req.body);
    res.status(201).json({ success: true, data: rule });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listDecisionTables = async (req, res) => {
  try {
    const tables = await decisionEngineService.listDecisionTables();
    res.json({ success: true, data: tables });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createDecisionTable = async (req, res) => {
  try {
    const table = await decisionEngineService.createDecisionTable(req.body);
    res.status(201).json({ success: true, data: table });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAnalyticsDashboard = async (req, res) => {
  try {
    const summary = await processAnalyticsService.getDashboardSummary();
    const analytics = await processAnalyticsService.listProcessAnalytics();
    const recommendations = await processAnalyticsService.getRecommendations();
    res.json({ success: true, data: { summary, analytics, recommendations } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
