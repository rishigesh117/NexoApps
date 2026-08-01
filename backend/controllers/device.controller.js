/**
 * Device Controller
 * NexoApps Platform - Phase 5C
 */

const deviceService = require('../services/device.service');

exports.getDevices = async (req, res, next) => {
  try {
    const devices = deviceService.getDevices(req.user?.id);
    return res.status(200).json({
      success: true,
      data: devices,
    });
  } catch (err) {
    next(err);
  }
};

exports.removeDevice = async (req, res, next) => {
  try {
    const { id } = req.params;
    deviceService.removeDevice(id);
    return res.status(200).json({
      success: true,
      message: 'Device removed successfully',
    });
  } catch (err) {
    next(err);
  }
};
