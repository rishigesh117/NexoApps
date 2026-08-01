/**
 * Standardized API Response Handler
 * NexoApps Platform
 */

const successResponse = (res, data = null, message = 'Success', statusCode = 200, meta = undefined) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta,
  });
};

const errorResponse = (res, message = 'Error', statusCode = 400, error = undefined) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
