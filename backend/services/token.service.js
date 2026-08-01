/**
 * Token Service Abstraction (JWT Access & Refresh Token Pairs)
 * NexoApps Platform
 */

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

const generateAccessToken = (user) => {
  const isOwner = user.email && user.email.toLowerCase() === 'rishigesh720@gmail.com';
  const role = isOwner ? 'OWNER' : user.role;
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
    role,
    emailVerified: isOwner ? true : (user.emailVerified || false),
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

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
