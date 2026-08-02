/**
 * Sprint Controller
 * NexoApps Platform - Phase 6B (Version 2.2)
 */

const sprintService = require('../services/sprint.service');

exports.getSprints = async (req, res, next) => {
  try {
    const sprints = sprintService.getSprints();
    const tasks = sprintService.getSprintTasks();
    return res.status(200).json({
      success: true,
      data: { sprints, tasks },
    });
  } catch (err) {
    next(err);
  }
};
