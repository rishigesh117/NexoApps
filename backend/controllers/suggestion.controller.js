/**
 * Suggestion Controller Blueprint
 * NexoApps Platform
 */

const { successResponse } = require('../utils/responseHandler');

exports.submitSuggestion = async (req, res, next) => {
  return successResponse(res, { status: 'Received' }, 'Suggestion submitted successfully stub');
};
