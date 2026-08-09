/**
 * Authentication Endpoints Controller
 * NexoApps Platform
 */

const authService = require('../services/auth.service');
const { recordFailedAttempt, clearFailedAttempts } = require('../middleware/accountLock.middleware');
const { successResponse, errorResponse } = require('../utils/responseHandler');

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await authService.createUser({ username, email, password });
    const session = await authService.createSession(newUser);

    return successResponse(res, {
      message: 'Your account has been created successfully. Verify your email to unlock all features.',
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      user: session.user,
      bannerMessage: 'Verify your email to unlock all features.',
    }, 'Signup successful', 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.authenticateUser(email, password);

    if (!user) {
      recordFailedAttempt(email);
      return errorResponse(res, 'Invalid email address or password', 401);
    }

    clearFailedAttempts(email);
    const session = await authService.createSession(user);

    return successResponse(res, {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      user: session.user,
    }, 'Login successful');
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      await authService.revokeRefreshToken(refreshToken);
    }
    return successResponse(res, null, 'Logged out successfully');
  } catch (err) {
    next(err);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return errorResponse(res, 'Refresh Token is required', 400);
    }
    const result = await authService.refreshSession(refreshToken);
    return successResponse(res, result, 'Access token refreshed successfully');
  } catch (err) {
    return errorResponse(res, err.message, 401);
  }
};

/**
 * Verify a user's email address using a cryptographic verification token.
 * Accepts `token` in the request body (sent via email link or "Verify Now" button).
 * On success, returns a fresh session (access + refresh tokens) with updated user data
 * so the frontend can immediately reflect the verified status without stale data.
 */
exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return errorResponse(res, 'Verification token is required', 400);
    }

    const verifiedUser = await authService.verifyEmailToken(token);

    if (!verifiedUser) {
      return errorResponse(res, 'Invalid or expired verification token. Please request a new verification email.', 400);
    }

    // Issue a fresh session with updated user data (emailVerified: true)
    // This ensures the frontend gets a new JWT that reflects the verified status
    const session = await authService.createSession(verifiedUser);

    return successResponse(res, {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      user: session.user,
      message: 'Email verified successfully! All features are unlocked.',
    }, 'Email verified successfully! All features are unlocked.');
  } catch (err) {
    next(err);
  }
};

/**
 * Resend a verification email to the user.
 * Requires the user's email address. Generates a new verification token.
 */
exports.resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return errorResponse(res, 'Email address is required', 400);
    }

    const token = await authService.generateVerificationTokenForUser(email.trim());

    if (!token) {
      // Don't reveal whether the email exists or is already verified
      return successResponse(res, null, 'If this email is registered and unverified, a verification email has been sent.');
    }

    return successResponse(res, null, 'Verification email sent successfully! Please check your inbox.');
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    return successResponse(res, null, 'Password reset instructions sent to your email address blueprint stub');
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    return successResponse(res, null, 'Password reset successfully blueprint stub');
  } catch (err) {
    next(err);
  }
};
