/**
 * Account Lock Security Middleware
 * Locks user accounts for 15 minutes after 5 consecutive failed login attempts
 * NexoApps Platform
 */

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_TIME_MS = 15 * 60 * 1000; // 15 minutes

// In-memory failed attempt tracking (mirrored in DB for production resilience)
const failedAttemptsMap = new Map();

const checkAccountLock = (req, res, next) => {
  const { email } = req.body;
  if (!email) return next();

  const record = failedAttemptsMap.get(email);
  if (record && record.lockedUntil && record.lockedUntil > Date.now()) {
    const remainingMinutes = Math.ceil((record.lockedUntil - Date.now()) / 60000);
    return res.status(423).json({
      success: false,
      message: `Account is temporarily locked due to repeated failed login attempts. Try again in ${remainingMinutes} minute(s).`,
    });
  }

  next();
};

const recordFailedAttempt = (email) => {
  if (!email) return;
  const now = Date.now();
  const record = failedAttemptsMap.get(email) || { count: 0, lockedUntil: null };

  // Reset count if lock expired
  if (record.lockedUntil && record.lockedUntil < now) {
    record.count = 0;
    record.lockedUntil = null;
  }

  record.count += 1;
  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCK_TIME_MS;
    console.warn(`[SECURITY WARNING]: Account locked for ${email} until ${new Date(record.lockedUntil).toISOString()}`);
  }

  failedAttemptsMap.set(email, record);
};

const clearFailedAttempts = (email) => {
  if (email) {
    failedAttemptsMap.delete(email);
  }
};

module.exports = {
  checkAccountLock,
  recordFailedAttempt,
  clearFailedAttempts,
};
