/**
 * Tenant Controller
 * NexoApps Platform - Phase 7A (Version 3.0)
 */

const tenantService = require('../services/tenant.service');
const brandingService = require('../services/branding.service');
const customDomainService = require('../services/custom_domain.service');

exports.getTenants = async (req, res, next) => {
  try {
    const tenants = tenantService.getTenants();
    return res.status(200).json({
      success: true,
      data: tenants,
    });
  } catch (err) {
    next(err);
  }
};

exports.createTenant = async (req, res, next) => {
  try {
    const tenant = tenantService.createTenant(req.user?.id, req.body);
    return res.status(201).json({
      success: true,
      data: tenant,
    });
  } catch (err) {
    next(err);
  }
};

exports.getBranding = async (req, res, next) => {
  try {
    const branding = brandingService.getBranding(req.params.tenantId);
    return res.status(200).json({
      success: true,
      data: branding,
    });
  } catch (err) {
    next(err);
  }
};

exports.getDomains = async (req, res, next) => {
  try {
    const domains = customDomainService.getDomains(req.params.tenantId);
    return res.status(200).json({
      success: true,
      data: domains,
    });
  } catch (err) {
    next(err);
  }
};
