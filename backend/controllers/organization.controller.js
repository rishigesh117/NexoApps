/**
 * Organization Controller
 * NexoApps Platform - Phase 5D
 */

const organizationService = require('../services/organization.service');
const teamService = require('../services/team.service');
const invitationService = require('../services/invitation.service');

exports.getAllOrganizations = async (req, res, next) => {
  try {
    const orgs = organizationService.getAllOrganizations();
    return res.status(200).json({
      success: true,
      data: orgs,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOrganizationBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const org = organizationService.getOrganizationBySlug(slug);
    if (!org) return res.status(404).json({ success: false, message: 'Organization not found' });
    return res.status(200).json({
      success: true,
      data: org,
    });
  } catch (err) {
    next(err);
  }
};

exports.createOrganization = async (req, res, next) => {
  try {
    const org = organizationService.createOrganization(req.body, req.user?.id);
    return res.status(201).json({
      success: true,
      data: org,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMembers = async (req, res, next) => {
  try {
    const { orgId } = req.params;
    const members = teamService.getMembers(orgId);
    return res.status(200).json({
      success: true,
      data: members,
    });
  } catch (err) {
    next(err);
  }
};

exports.inviteMember = async (req, res, next) => {
  try {
    const { orgId } = req.params;
    const { email, role } = req.body;
    const invitation = invitationService.createInvitation(orgId, email, role, req.user?.id);
    return res.status(201).json({
      success: true,
      data: invitation,
    });
  } catch (err) {
    next(err);
  }
};
