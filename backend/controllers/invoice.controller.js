/**
 * Invoice Controller
 * NexoApps Platform - Phase 7A (Version 3.0)
 */

const invoiceService = require('../services/invoice.service');

exports.getInvoices = async (req, res, next) => {
  try {
    const invoices = invoiceService.getInvoices(req.query.tenantId);
    return res.status(200).json({
      success: true,
      data: invoices,
    });
  } catch (err) {
    next(err);
  }
};
