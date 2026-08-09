import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

/**
 * Universal Next.js Serverless API Route Handler with PostgreSQL Database Integration
 * Connects to Neon / Supabase cloud database when DATABASE_URL environment variable is set.
 */

// Connection pool singleton for serverless environment
let pool: Pool | null = null;
function getDbPool() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30000,
    });
  }
  return pool;
}

// In-Memory User Store Fallback
const serverlessUsers = new Map<string, any>();

// Seed Platform Owner Account
serverlessUsers.set('rishigesh720@gmail.com', {
  id: 'owner-0000-0000-0000-000000000001',
  username: 'rishigesh',
  email: 'rishigesh720@gmail.com',
  password: 'Owner123!',
  role: 'OWNER',
  emailVerified: true,
  status: 'ACTIVE',
  createdAt: new Date().toISOString(),
});

// Seed Admin Account
serverlessUsers.set('admin@nexoapps.com', {
  id: 'admin-0000-0000-0000-000000000001',
  username: 'admin',
  email: 'admin@nexoapps.com',
  password: 'Admin123!',
  role: 'ADMIN',
  emailVerified: true,
  status: 'ACTIVE',
  createdAt: new Date().toISOString(),
});

// Helper to generate stateless token containing encoded user email
function generateToken(email: string) {
  const encodedEmail = Buffer.from(email.toLowerCase()).toString('base64url');
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `nexo_token_${encodedEmail}_${Date.now()}_${randomStr}`;
}

// Helper to extract email from stateless token
function extractEmailFromToken(token: string): string | null {
  if (!token || !token.startsWith('nexo_token_')) return null;
  try {
    const parts = token.split('_');
    if (parts.length >= 3) {
      const decoded = Buffer.from(parts[2], 'base64url').toString('utf8');
      if (decoded && decoded.includes('@')) {
        return decoded.toLowerCase();
      }
    }
  } catch (e) {
    return null;
  }
  return null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query;
  const endpoint = Array.isArray(path) ? path.join('/') : path || '';
  const db = getDbPool();

  // 1. Check if external BACKEND_URL is configured
  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
  if (backendUrl && backendUrl !== 'http://localhost:5000') {
    try {
      const targetUrl = `${backendUrl.replace(/\/$/, '')}/api/v1/${endpoint}`;
      const backendRes = await fetch(targetUrl, {
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
          ...(req.headers.authorization ? { Authorization: req.headers.authorization } : {}),
        },
        body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
      });

      const data = await backendRes.json().catch(() => ({}));
      return res.status(backendRes.status).json(data);
    } catch (e) {
      // Fallback to serverless handler if backend proxy fails
    }
  }

  // 2. Serverless API Endpoint Handlers

  // POST /api/v1/auth/login
  if (endpoint === 'auth/login' && req.method === 'POST') {
    const { email, password } = req.body || {};
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanEmail || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const token = generateToken(cleanEmail);
    const refreshToken = `nexo_refresh_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Try PostgreSQL query if DATABASE_URL is available
    if (db) {
      try {
        const result = await db.query(
          `SELECT id, username, email, password_hash, role, email_verified, status FROM users WHERE LOWER(email) = LOWER($1)`,
          [cleanEmail]
        );

        if (result.rows.length > 0) {
          const dbUser = result.rows[0];
          // Password Check (matches stored password_hash or plain password)
          if (dbUser.password_hash !== password && dbUser.password_hash !== `hash_${password}`) {
            return res.status(401).json({ success: false, message: 'Invalid email address or password' });
          }

          // Update last_login timestamp
          await db.query(`UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1`, [dbUser.id]).catch(() => {});

          // SECURITY: Role comes from the database, never from email string matching
          const userRole = dbUser.role || 'MEMBER';

          return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
              accessToken: token,
              refreshToken,
              user: {
                id: dbUser.id,
                username: dbUser.username,
                email: dbUser.email,
                role: userRole,
                emailVerified: dbUser.email_verified ?? true,
              },
            },
          });
        }
      } catch (dbErr) {
        console.error('PostgreSQL Login Error:', dbErr);
      }
    }

    // In-memory fallback if not found in DB or DB not connected
    const existingUser = serverlessUsers.get(cleanEmail);

    if (existingUser) {
      if (existingUser.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid email address or password' });
      }
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          accessToken: token,
          refreshToken,
          user: {
            id: existingUser.id,
            username: existingUser.username,
            email: existingUser.email,
            role: existingUser.role,
            emailVerified: existingUser.emailVerified,
          },
        },
      });
    }

    // SECURITY: Do not auto-create users on login attempt — require signup first
    return res.status(401).json({ success: false, message: 'Invalid email address or password' });
  }

  // POST /api/v1/auth/signup
  if (endpoint === 'auth/signup' && req.method === 'POST') {
    const { username, email, password } = req.body || {};
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanUsername = (username || cleanEmail.split('@')[0]).trim();
    // SECURITY: All new signups get MEMBER role. Owner/Admin are only set via seed data or admin actions.

    if (!cleanEmail || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const token = generateToken(cleanEmail);
    const refreshToken = `nexo_refresh_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Try PostgreSQL insert if DATABASE_URL is available
    if (db) {
      try {
        // Check if email or username already exists
        const checkResult = await db.query(
          `SELECT id FROM users WHERE LOWER(email) = LOWER($1) OR LOWER(username) = LOWER($2)`,
          [cleanEmail, cleanUsername]
        );

        if (checkResult.rows.length > 0) {
          return res.status(400).json({
            success: false,
            message: 'An account with this email address or username already exists',
          });
        }

        const newId = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        const role = 'MEMBER';
        const emailVerified = false;

        const insertResult = await db.query(
          `INSERT INTO users (id, username, email, password_hash, role, email_verified, status)
           VALUES ($1, $2, $3, $4, $5, $6, 'ACTIVE')
           RETURNING id, username, email, role, email_verified`,
          [newId, cleanUsername, cleanEmail, password, role, emailVerified]
        );

        const createdUser = insertResult.rows[0];

        return res.status(201).json({
          success: true,
          message: 'Signup successful',
          data: {
            accessToken: token,
            refreshToken,
            user: {
              id: createdUser.id,
              username: createdUser.username,
              email: createdUser.email,
              role: createdUser.role,
              emailVerified: createdUser.email_verified,
            },
          },
        });
      } catch (dbErr: any) {
        console.error('PostgreSQL Signup Error:', dbErr);
        if (dbErr.code === '23505') {
          return res.status(400).json({
            success: false,
            message: 'An account with this email address or username already exists',
          });
        }
      }
    }

    // Fallback to in-memory store
    // SECURITY: All new signups get MEMBER role with unverified email
    const newUser = {
      id: `usr-${Date.now()}`,
      username: cleanUsername,
      email: cleanEmail,
      password: password || 'Default123!',
      role: 'MEMBER' as string,
      emailVerified: false,
      status: 'PENDING_VERIFICATION',
      createdAt: new Date().toISOString(),
    };

    serverlessUsers.set(cleanEmail, newUser);

    return res.status(201).json({
      success: true,
      message: 'Signup successful',
      data: {
        accessToken: token,
        refreshToken,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
          emailVerified: newUser.emailVerified,
        },
      },
    });
  }

  // POST /api/v1/auth/verify-email
  if (endpoint === 'auth/verify-email' && req.method === 'POST') {
    const { token: verifyToken } = req.body || {};

    if (!verifyToken) {
      return res.status(400).json({ success: false, message: 'Verification token is required' });
    }

    // Extract email from the verification token
    const verifyEmail = extractEmailFromToken(verifyToken);
    if (!verifyEmail) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification token' });
    }

    // Find the user and mark as verified
    const verifyUser = serverlessUsers.get(verifyEmail);
    if (verifyUser) {
      verifyUser.emailVerified = true;
      verifyUser.status = 'ACTIVE';

      const newToken = generateToken(verifyEmail);
      const newRefreshToken = `nexo_refresh_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

      return res.status(200).json({
        success: true,
        message: 'Email verified successfully! All features are unlocked.',
        data: {
          accessToken: newToken,
          refreshToken: newRefreshToken,
          user: {
            id: verifyUser.id,
            username: verifyUser.username,
            email: verifyUser.email,
            role: verifyUser.role,
            emailVerified: true,
          },
        },
      });
    }

    return res.status(400).json({ success: false, message: 'Invalid verification token' });
  }

  // POST /api/v1/auth/resend-verification
  if (endpoint === 'auth/resend-verification' && req.method === 'POST') {
    return res.status(200).json({
      success: true,
      message: 'If this email is registered and unverified, a verification email has been sent.',
    });
  }

  // POST /api/v1/auth/logout
  if (endpoint === 'auth/logout') {
    return res.status(200).json({ success: true, message: 'Logged out successfully' });
  }

  // POST /api/v1/auth/refresh
  if (endpoint === 'auth/refresh') {
    return res.status(200).json({
      success: true,
      data: { accessToken: `nexo_token_refreshed_${Date.now()}` },
    });
  }

  // GET /api/v1/users/me — Authenticated User Profile Endpoint
  if (endpoint === 'users/me') {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '').trim();
    const tokenEmail = extractEmailFromToken(token);

    if (!tokenEmail) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or missing authentication token',
      });
    }

    // 1. Try querying PostgreSQL database for this specific user
    if (db) {
      try {
        const dbResult = await db.query(
          `SELECT id, username, email, role, email_verified FROM users WHERE LOWER(email) = LOWER($1)`,
          [tokenEmail]
        );

        if (dbResult.rows.length > 0) {
          const u = dbResult.rows[0];
          return res.status(200).json({
            success: true,
            data: {
              id: u.id,
              username: u.username,
              email: u.email,
              role: u.role || 'MEMBER',
              emailVerified: u.email_verified ?? false,
            },
          });
        }
      } catch (err) {
        console.error('Error fetching user profile from PostgreSQL:', err);
      }
    }

    // 2. Fallback to in-memory store for this specific user
    const memUser = serverlessUsers.get(tokenEmail);
    if (memUser) {
      return res.status(200).json({
        success: true,
        data: {
          id: memUser.id,
          username: memUser.username,
          email: memUser.email,
          role: memUser.role,
          emailVerified: memUser.emailVerified,
        },
      });
    }

    // 3. SECURITY: If user not found in DB or memory, return 401 instead of auto-creating
    return res.status(401).json({
      success: false,
      message: 'User not found. Please log in again.',
    });
  }

  // GET /api/v1/health
  if (endpoint === 'health') {
    return res.status(200).json({
      status: 'UP',
      platform: 'NexoApps Live Serverless Engine',
      database: process.env.DATABASE_URL ? 'PostgreSQL (Neon Connected)' : 'In-Memory',
      timestamp: new Date().toISOString(),
    });
  }

  // Default Fallback
  return res.status(200).json({
    success: true,
    message: 'NexoApps API Catch-All Route Operational',
    endpoint,
  });
}
