/**
 * AI Marketplace Controller
 * NexoApps Platform - Phase 6D (Version 2.4)
 */

const marketplaceService = require('../services/marketplace.service');
const discoveryService = require('../services/discovery.service');

exports.getItems = async (req, res, next) => {
  try {
    const { type } = req.query;
    const items = marketplaceService.getItems(type);
    const stats = marketplaceService.getStats();
    return res.status(200).json({
      success: true,
      data: { items, stats },
    });
  } catch (err) {
    next(err);
  }
};

exports.getItemById = async (req, res, next) => {
  try {
    const item = marketplaceService.getItemById(req.params.id);
    return res.status(200).json({
      success: true,
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

exports.publishItem = async (req, res, next) => {
  try {
    const item = marketplaceService.publishItem(req.user?.id, req.body);
    return res.status(201).json({
      success: true,
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCollections = async (req, res, next) => {
  try {
    const collections = discoveryService.getFeaturedCollections();
    return res.status(200).json({
      success: true,
      data: collections,
    });
  } catch (err) {
    next(err);
  }
};
