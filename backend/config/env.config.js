/**
 * Production Environment Configuration & Validation Manager
 * NexoApps Platform - Phase 4E
 */

const env = process.env.NODE_ENV || 'development';

const config = {
  env,
  isProduction: env === 'production',
  isStaging: env === 'staging',
  isDevelopment: env === 'development',

  port: process.env.PORT || 5000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  apiUrl: process.env.API_URL || 'http://localhost:5000/api/v1',

  jwt: {
    secret: process.env.JWT_SECRET || 'nexoapps-production-super-secret-key-2026',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'nexoapps-production-refresh-secret-key-2026',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  storage: {
    driver: process.env.STORAGE_DRIVER || 'local', // 'local' | 's3' | 'r2' | 'gcp' | 'azure'
    bucket: process.env.STORAGE_BUCKET || 'nexoapps-apk-bucket',
    region: process.env.STORAGE_REGION || 'us-east-1',
    uploadLimitMb: 500,
  },

  security: {
    rateLimitWindowMs: 15 * 60 * 1000, // 15 minutes
    rateLimitMaxRequests: 1000,
    corsAllowedOrigins: (process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:5000').split(','),
  },

  download: {
    signedUrlExpirationMinutes: 30,
    maxConcurrentDownloadsPerUser: 5,
  },
};

const validateConfig = () => {
  if (config.isProduction && config.jwt.secret === 'nexoapps-production-super-secret-key-2026') {
    console.warn('[SECURITY WARNING] Using fallback JWT secret in production mode. Set JWT_SECRET in environment.');
  }
};

validateConfig();

module.exports = config;
