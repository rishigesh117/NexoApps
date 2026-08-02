/**
 * Platform OS Controller
 * NexoApps Platform - Phase 6E (Version 2.5)
 */

const platformHealthService = require('../services/platform_health.service');
const notificationCenterService = require('../services/notification_center.service');
const commandPaletteService = require('../services/command_palette.service');

exports.getHealth = async (req, res, next) => {
  try {
    const health = platformHealthService.getHealthStatus();
    return res.status(200).json({
      success: true,
      data: health,
    });
  } catch (err) {
    next(err);
  }
};

exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = notificationCenterService.getNotifications(req.user?.id);
    return res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCommands = async (req, res, next) => {
  try {
    const commands = commandPaletteService.getCommands();
    return res.status(200).json({
      success: true,
      data: commands,
    });
  } catch (err) {
    next(err);
  }
};
