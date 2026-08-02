/**
 * Platform Automation Controller
 * NexoApps Platform - Phase 5B (Extended for Phase 7D)
 */

const automationService = require('../services/automation.service');
const automationEngineService = require('../services/automation_engine.service');
const queueService = require('../services/queue.service');
const workerService = require('../services/worker.service');
const schedulerV2Service = require('../services/scheduler_v2.service');

exports.getLogs = async (req, res, next) => {
  try {
    const logs = automationService.getLogs();
    return res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAuditReport = async (req, res, next) => {
  try {
    const report = automationService.runDiagnosticAudit();
    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (err) {
    next(err);
  }
};

// ─── Phase 7D Extensions ───

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
