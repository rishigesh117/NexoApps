/**
 * Developer API Controller
 * NexoApps Platform - Phase 7B (Version 3.1)
 */

const developerApiService = require('../services/developer_api.service');
const apiDocumentationService = require('../services/api_documentation.service');
const sdkService = require('../services/sdk.service');

exports.getKeys = async (req, res, next) => {
  try {
    const keys = developerApiService.getApiKeys();
    return res.status(200).json({
      success: true,
      data: keys,
    });
  } catch (err) {
    next(err);
  }
};

exports.getDocs = async (req, res, next) => {
  try {
    const spec = apiDocumentationService.getOpenApiSpec();
    return res.status(200).json({
      success: true,
      data: spec,
    });
  } catch (err) {
    next(err);
  }
};

exports.getSdks = async (req, res, next) => {
  try {
    const sdks = sdkService.getSdks();
    return res.status(200).json({
      success: true,
      data: sdks,
    });
  } catch (err) {
    next(err);
  }
};
