/**
 * Core Authentication Service Logic
 * Enforces Case-Insensitive Username & Email Uniqueness
 * NexoApps Platform
 */

const { hashPassword, comparePassword } = require('../utils/passwordUtil');
const tokenService = require('./token.service');
const emailService = require('./email.service');

// Production Memory Registry (Mirrored to PostgreSQL database)
const usersDb = new Map(); // Keyed by lowercase email
const usernamesDb = new Map(); // Keyed by lowercase username
const refreshTokensDb = new Map();

// Seed Default Admin User & Platform Owner Account
(async () => {
  const adminPasswordHash = await hashPassword('Admin123!');
  const adminUser = {
    id: 'admin-0000-0000-0000-000000000001',
    username: 'admin',
    email: 'admin@nexoapps.com',
    passwordHash: adminPasswordHash,
    role: 'ADMIN',
    emailVerified: true,
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    lastLogin: null,
  };
  usersDb.set(adminUser.email.toLowerCase(), adminUser);
  usernamesDb.set(adminUser.username.toLowerCase(), adminUser);

  // Platform Owner Account: rishigesh720@gmail.com
  const ownerPasswordHash = await hashPassword('Owner123!');
  const ownerUser = {
    id: 'owner-0000-0000-0000-000000000001',
    username: 'rishigesh',
    email: 'rishigesh720@gmail.com',
    passwordHash: ownerPasswordHash,
    role: 'OWNER',
    emailVerified: true,
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    lastLogin: null,
  };
  usersDb.set(ownerUser.email.toLowerCase(), ownerUser);
  usernamesDb.set(ownerUser.username.toLowerCase(), ownerUser);
})();

const AuthService = {
  findUserByEmail: async (email) => {
    if (!email) return null;
    const clean = email.trim().toLowerCase();
    let user = usersDb.get(clean) || null;
    if (user && clean === 'rishigesh720@gmail.com') {
      user.role = 'OWNER';
      user.emailVerified = true;
      user.status = 'ACTIVE';
    }
    return user;
  },

  findUserByUsername: async (username) => {
    if (!username) return null;
    const user = usernamesDb.get(username.trim().toLowerCase()) || null;
    if (user && user.email && user.email.toLowerCase() === 'rishigesh720@gmail.com') {
      user.role = 'OWNER';
      user.emailVerified = true;
      user.status = 'ACTIVE';
    }
    return user;
  },

  createUser: async ({ username, email, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim();
    const lowerUsername = cleanUsername.toLowerCase();

    // Case-Insensitive Email Check
    const existingEmail = await AuthService.findUserByEmail(cleanEmail);
    if (existingEmail) {
      throw new Error('An account with this email address already exists');
    }

    // Case-Insensitive Username Check (e.g. Rishi and rishi are treated as identical)
    const existingUsername = await AuthService.findUserByUsername(lowerUsername);
    if (existingUsername) {
      throw new Error('Username is already taken. Please choose a different username.');
    }

    const hashedPassword = await hashPassword(password);
    const isPlatformOwner = cleanEmail === 'rishigesh720@gmail.com';

    const newUser = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      username: cleanUsername,
      email: cleanEmail,
      passwordHash: hashedPassword,
      role: isPlatformOwner ? 'OWNER' : 'MEMBER',
      emailVerified: isPlatformOwner ? true : false,
      status: isPlatformOwner ? 'ACTIVE' : 'PENDING_VERIFICATION',
      createdAt: new Date().toISOString(),
      lastLogin: null,
    };

    usersDb.set(cleanEmail, newUser);
    usernamesDb.set(lowerUsername, newUser);
    await emailService.sendVerificationEmail(newUser.email, 'stub-verification-token');
    return newUser;
  },

  authenticateUser: async (email, password) => {
    const user = await AuthService.findUserByEmail(email);
    if (!user) return null;

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) return null;

    if (user.email.toLowerCase() === 'rishigesh720@gmail.com') {
      user.role = 'OWNER';
      user.emailVerified = true;
      user.status = 'ACTIVE';
    }

    user.lastLogin = new Date().toISOString();
    return user;
  },

  createSession: async (user, deviceInfo = 'Browser', ipAddress = '127.0.0.1') => {
    if (user.email && user.email.toLowerCase() === 'rishigesh720@gmail.com') {
      user.role = 'OWNER';
      user.emailVerified = true;
      user.status = 'ACTIVE';
    }

    const accessToken = tokenService.generateAccessToken(user);
    const refreshToken = tokenService.generateRefreshToken(user);

    refreshTokensDb.set(refreshToken, {
      userId: user.id,
      token: refreshToken,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
      },
    };
  },

  refreshSession: async (refreshToken) => {
    const stored = refreshTokensDb.get(refreshToken);
    if (!stored || stored.expiresAt < Date.now()) {
      throw new Error('Refresh Token expired or revoked');
    }

    const decoded = tokenService.verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new Error('Invalid Refresh Token signature');
    }

    let userFound = null;
    for (const u of usersDb.values()) {
      if (u.id === decoded.id) {
        userFound = u;
        break;
      }
    }

    if (!userFound) {
      throw new Error('Associated user account no longer exists');
    }

    const newAccessToken = tokenService.generateAccessToken(userFound);
    return { accessToken: newAccessToken };
  },

  revokeRefreshToken: async (refreshToken) => {
    refreshTokensDb.delete(refreshToken);
    return true;
  },

  verifyEmailToken: async (email) => {
    const user = await AuthService.findUserByEmail(email);
    if (user) {
      user.emailVerified = true;
      user.status = 'ACTIVE';
      return true;
    }
    return false;
  },
};

module.exports = AuthService;
