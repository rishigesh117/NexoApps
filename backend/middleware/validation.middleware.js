/**
 * Input Validation & Sanitization Middleware
 * NexoApps Platform
 */

const { validatePasswordStrength } = require('../utils/passwordUtil');

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && emailRegex.test(email.trim());
};

const validateSignupPayload = (req, res, next) => {
  const { username, email, password } = req.body || {};

  if (!username || typeof username !== 'string' || username.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: Username must be at least 3 characters long',
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: Invalid email address format',
    });
  }

  const passValidation = validatePasswordStrength(password);
  if (!passValidation.isValid) {
    return res.status(400).json({
      success: false,
      message: `Validation Error: ${passValidation.error}`,
    });
  }

  req.body.email = email.trim().toLowerCase();
  req.body.username = username.trim();
  next();
};

const validateLoginPayload = (req, res, next) => {
  const { email, password } = req.body || {};

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: Invalid email address format',
    });
  }

  if (!password || typeof password !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: Password is required',
    });
  }

  req.body.email = email.trim().toLowerCase();
  next();
};

module.exports = {
  isValidEmail,
  validateSignupPayload,
  validateLoginPayload,
};
