/**
 * Security Hardening Middleware
 * NexoApps Platform - Phase 4E
 */

const envConfig = require('../config/env.config');

const securityHeaders = (req, res, next) => {
  res.setHeader('X-DNS-Prefetch-Control', 'off');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );
  next();
};

const sanitizeInput = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      }
    });
  }
  next();
};

// Rate limiter storage cache
const requestCounts = new Map();

const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const now = Date.now();
  const windowMs = envConfig.security.rateLimitWindowMs;

  const record = requestCounts.get(ip) || { count: 0, resetTime: now + windowMs };

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
  } else {
    record.count += 1;
  }

  requestCounts.set(ip, record);

  if (record.count > envConfig.security.rateLimitMaxRequests) {
    return res.status(429).json({
      success: false,
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many requests. Please slow down and try again later.',
    });
  }

  next();
};

module.exports = {
  securityHeaders,
  sanitizeInput,
  rateLimiter,
};
