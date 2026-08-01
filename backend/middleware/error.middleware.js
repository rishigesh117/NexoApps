/**
 * Global Error Handler Middleware
 * NexoApps Platform
 */

const errorHandler = (err, req, res, next) => {
  console.error('[SERVER ERROR]:', err.stack || err.message);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;
