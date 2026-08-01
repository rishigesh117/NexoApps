/**
 * User Profile Controller
 * NexoApps Platform
 */

const { successResponse, errorResponse } = require('../utils/responseHandler');
const authService = require('../services/auth.service');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await authService.findUserByEmail(req.user.email);
    if (!user) {
      return errorResponse(res, 'User profile not found', 44);
    }
    return successResponse(res, {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
      status: user.status,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
    }, 'User profile retrieved');
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { username, profileImage } = req.body;
    const user = await authService.findUserByEmail(req.user.email);
    if (!user) {
      return errorResponse(res, 'User profile not found', 404);
    }
    if (username) {
      const cleanUsername = username.trim();
      if (cleanUsername.length < 3 || cleanUsername.length > 25) {
        return errorResponse(res, 'Username must be between 3 and 25 characters', 400);
      }
      if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
        return errorResponse(res, 'Only letters, numbers, and underscores allowed in username', 400);
      }

      // Case-insensitive check if username changed
      if (cleanUsername.toLowerCase() !== user.username.toLowerCase()) {
        const existingUser = await authService.findUserByUsername(cleanUsername.toLowerCase());
        if (existingUser) {
          return errorResponse(res, 'Username is already taken. Please choose a different username.', 400);
        }
      }
      user.username = cleanUsername;
    }

    if (profileImage) user.profileImage = profileImage;

    return successResponse(res, {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
      status: user.status,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
    }, 'Profile updated successfully');
  } catch (err) {
    next(err);
  }
};
