/**
 * File Upload Middleware Blueprint (Multer / Cloud Storage Ready)
 * NexoApps Platform
 */

const uploadMiddleware = {
  single: (fieldname) => (req, res, next) => {
    // Storage upload stub
    next();
  },
  array: (fieldname, maxCount) => (req, res, next) => {
    // Storage array upload stub
    next();
  },
};

module.exports = uploadMiddleware;
