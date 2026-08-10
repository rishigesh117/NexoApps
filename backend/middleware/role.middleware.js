/**
 * Role-Based Access Control (RBAC) Middleware
 * Supports GUEST, MEMBER, and ADMIN roles
 * NexoApps Platform
 */

const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    // If route allows GUEST, allow unauthenticated access
    if (allowedRoles.includes('GUEST') && !req.user) {
      req.user = { role: 'GUEST' };
      return next();
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required to access this resource',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Access restricted. Required role: [${allowedRoles.join(', ')}]. Your role: ${req.user.role}`,
      });
    }

    next();
  };
};

const requireAdmin = authorizeRole('ADMIN');
const requireMember = authorizeRole('MEMBER', 'DEVELOPER', 'ADMIN', 'OWNER');

module.exports = {
  authorizeRole,
  requireAdmin,
  requireMember,
};
