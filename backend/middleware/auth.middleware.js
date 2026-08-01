/**
 * JWT Authentication Token Verification Middleware
 * NexoApps Platform
 */

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access Denied: No authentication token provided',
    });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.accessSecret);
    req.user = decoded; // { id, email, role, username }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        code: 'TOKEN_EXPIRED',
        message: 'Access Token expired. Please refresh your session.',
      });
    }
    return res.status(403).json({
      success: false,
      message: 'Invalid or malformed authentication token',
    });
  }
};

const optionalAuthToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.accessSecret);
    req.user = decoded;
  } catch (err) {
    req.user = null;
  }
  next();
};

const requireAdmin = (req, res, next) => {
  if (!req.user || (req.user.role !== 'ADMIN' && req.user.role !== 'OWNER')) {
    return res.status(403).json({
      success: false,
      message: 'Access Denied: Admin privileges required',
    });
  }
  next();
};

const requireDeveloper = (req, res, next) => {
  if (!req.user || (req.user.role !== 'DEVELOPER' && req.user.role !== 'ADMIN' && req.user.role !== 'OWNER')) {
    return res.status(403).json({
      success: false,
      message: 'Access Denied: Developer privileges required',
    });
  }
  next();
};

const requireDeveloperOrAdmin = (req, res, next) => {
  if (!req.user || (req.user.role !== 'DEVELOPER' && req.user.role !== 'ADMIN' && req.user.role !== 'OWNER')) {
    return res.status(403).json({
      success: false,
      message: 'Access Denied: Developer or Admin privileges required',
    });
  }
  next();
};

const requireOwner = (req, res, next) => {
  if (!req.user || req.user.role !== 'OWNER') {
    return res.status(403).json({
      success: false,
      message: 'Access Denied: Owner privileges required',
    });
  }
  next();
};

module.exports = authenticateToken;
module.exports.authenticateToken = authenticateToken;
module.exports.optionalAuthToken = optionalAuthToken;
module.exports.requireAdmin = requireAdmin;
module.exports.requireDeveloper = requireDeveloper;
module.exports.requireDeveloperOrAdmin = requireDeveloperOrAdmin;
module.exports.requireOwner = requireOwner;
