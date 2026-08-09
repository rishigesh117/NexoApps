/**
 * Express Application Server Entrypoint
 * NexoApps Platform - Backend Foundation
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const apiRoutes = require('./routes');
const errorHandler = require('./middleware/error.middleware');
const logger = require('./utils/logger');

const { securityHeaders, sanitizeInput, rateLimiter } = require('./middleware/security.middleware');

const app = express();
const PORT = process.env.PORT || 5000;
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

// Security Headers & Cross-Origin Middleware
app.use(securityHeaders);
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: true,
  credentials: true,
}));

// Body Parsing & Sanitization Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(sanitizeInput);
app.use(rateLimiter);

// Static File Serving (Uploads Directory)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    platform: 'NexoApps Backend Engine',
    timestamp: new Date().toISOString(),
  });
});

// API Routes Master Mounting
app.use(API_PREFIX, apiRoutes);

// Global Error Handling Middleware
app.use(errorHandler);

// Express Server Listener
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`NexoApps API Engine running on port ${PORT} [Prefix: ${API_PREFIX}]`);
  });
}

module.exports = app;
