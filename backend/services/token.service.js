/**
 * Token Service Abstraction (JWT Access & Refresh Token Pairs)
 * NexoApps Platform
 */

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

const EMAIL_VERIFICATION_SECRET = process.env.JWT_EMAIL_VERIFY_SECRET || 'nexoapps-email-verification-secret-key-change-in-env';
const EMAIL_VERIFICATION_EXPIRES_IN = '24h'; // Verification links valid for 24 hours

const generateAccessToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
    emailVerified: user.emailVerified || false,
  };
  return jwt.sign(payload, jwtConfig.accessSecret, {
    expiresIn: jwtConfig.accessExpiresIn,
    algorithm: jwtConfig.algorithm,
  });
};

const generateRefreshToken = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
    tokenType: 'refresh',
  };
  return jwt.sign(payload, jwtConfig.refreshSecret, {
    expiresIn: jwtConfig.refreshExpiresIn,
    algorithm: jwtConfig.algorithm,
  });
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.refreshSecret);
  } catch (err) {
    return null;
  }
};

/**
 * Generate a signed JWT token for email verification.
 * Encodes the user's ID and email so the token is tied to a specific user.
 */
const generateEmailVerificationToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    purpose: 'email_verification',
  };
  return jwt.sign(payload, EMAIL_VERIFICATION_SECRET, {
    expiresIn: EMAIL_VERIFICATION_EXPIRES_IN,
    algorithm: jwtConfig.algorithm,
  });
};

/**
 * Verify and decode an email verification token.
 * Returns the decoded payload { id, email, purpose } or null if invalid/expired.
 */
const verifyEmailVerificationToken = (token) => {
  try {
    const decoded = jwt.verify(token, EMAIL_VERIFICATION_SECRET);
    if (decoded.purpose !== 'email_verification') {
      return null;
    }
    return decoded;
  } catch (err) {
    return null;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateEmailVerificationToken,
  verifyEmailVerificationToken,
};
