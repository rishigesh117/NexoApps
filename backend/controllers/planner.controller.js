/**
 * Planner Controller
 * NexoApps Platform - Phase 6B (Version 2.2)
 */

const plannerService = require('../services/planner.service');
const taskManagerService = require('../services/task_manager.service');

exports.getPlans = async (req, res, next) => {
  try {
    const plans = plannerService.getPlans(req.user?.id);
    const tasks = taskManagerService.getTasks();
    return res.status(200).json({
      success: true,
      data: { plans, tasks },
    });
  } catch (err) {
    next(err);
  }
};

exports.createPlan = async (req, res, next) => {
  try {
    const plan = plannerService.createPlan(req.user?.id, req.body);
    return res.status(201).json({
      success: true,
      data: plan,
    });
  } catch (err) {
    next(err);
  }
};
