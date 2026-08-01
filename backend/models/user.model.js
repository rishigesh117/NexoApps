/**
 * User Database Model Blueprint
 * NexoApps Platform
 */

const db = require('../config/db.config');

const UserModel = {
  findByEmail: async (email) => {
    // DB query stub: SELECT * FROM users WHERE email = $1
    return null;
  },
  create: async (userData) => {
    // DB query stub: INSERT INTO users ...
    return userData;
  },
};

module.exports = UserModel;
