/**
 * JWT Security & Token Expiration Configuration
 * NexoApps Platform
 */

module.exports = {
  accessSecret: process.env.JWT_SECRET || 'nexoapps-production-access-token-secret-key-change-in-env',
  accessExpiresIn: '15m', // Short-lived access token
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'nexoapps-production-refresh-token-secret-key-change-in-env',
  refreshExpiresIn: '7d', // Long-lived refresh token
  algorithm: 'HS256',
};
