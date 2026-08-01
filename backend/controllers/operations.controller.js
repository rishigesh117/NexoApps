/**
 * Operations Controller
 * NexoApps Platform - Phase 5E (Version 2.0 EC1)
 */

const monitoringV2Service = require('../services/monitoring_v2.service');
const notificationQueueService = require('../services/notification_queue.service');
const jobSchedulerService = require('../services/job_scheduler.service');

exports.getMetrics = async (req, res, next) => {
  try {
    const metrics = monitoringV2Service.getServerMetrics();
    return res.status(200).json({
      success: true,
      data: metrics,
    });
  } catch (err) {
    next(err);
  }
};

exports.getLogs = async (req, res, next) => {
  try {
    const logs = monitoringV2Service.getSystemLogs();
    return res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (err) {
    next(err);
  }
};

exports.getQueueStatus = async (req, res, next) => {
  try {
    const queueStatus = notificationQueueService.getQueueStatus();
    return res.status(200).json({
      success: true,
      data: queueStatus,
    });
  } catch (err) {
    next(err);
  }
};

exports.getJobs = async (req, res, next) => {
  try {
    const jobs = jobSchedulerService.getJobs();
    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (err) {
    next(err);
  }
};
