/**
 * Device Management Controller
 * NexoApps Platform - Phase 5C
 */

const deviceService = require('../services/device.service');

exports.getDevices = async (req, res, next) => {
  try {
    const userId = req.user?.id || 'usr-1';
    const devices = deviceService.getDevices(userId);
    return res.status(200).json({ success: true, data: devices });
  } catch (err) { next(err); }
};

exports.registerDevice = async (req, res, next) => {
  try {
    const userId = req.user?.id || 'usr-1';
    const device = deviceService.registerDevice(userId, req.body);
    return res.status(201).json({ success: true, data: device });
  } catch (err) { next(err); }
};

exports.renameDevice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { deviceName } = req.body;
    const device = deviceService.renameDevice(id, deviceName);
    return res.status(200).json({ success: true, data: device });
  } catch (err) { next(err); }
};

exports.removeDevice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = deviceService.removeDevice(id);
    return res.status(200).json({ success: true, data: result });
  } catch (err) { next(err); }
};
