/**
 * Support Ticket Controller
 * NexoApps Platform - Phase 5B
 */

const supportService = require('../services/support.service');
const knowledgeBaseService = require('../services/knowledgebase.service');

exports.getTickets = async (req, res, next) => {
  try {
    const { status, category } = req.query;
    const userId = req.user?.role === 'ADMIN' || req.user?.role === 'OWNER' ? null : req.user?.id;
    const tickets = supportService.getTickets({ status, category, userId });
    return res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (err) {
    next(err);
  }
};

exports.createTicket = async (req, res, next) => {
  try {
    const { subject, category, priority, description, userEmail, userName } = req.body;
    const ticket = supportService.createTicket({
      userId: req.user?.id,
      userName: userName || req.user?.username || 'User',
      userEmail: userEmail || req.user?.email || 'user@example.com',
      subject,
      category,
      priority,
      description,
    });
    return res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (err) {
    next(err);
  }
};

exports.addReply = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const isAdmin = req.user?.role === 'ADMIN' || req.user?.role === 'OWNER';
    const reply = supportService.addReply(id, {
      senderName: req.user?.username || 'User',
      isAdmin,
      message,
    });
    return res.status(200).json({
      success: true,
      data: reply,
    });
  } catch (err) {
    next(err);
  }
};

exports.getKnowledgeBase = async (req, res, next) => {
  try {
    const { q, category } = req.query;
    const articles = knowledgeBaseService.searchKnowledge(q, category);
    return res.status(200).json({
      success: true,
      data: articles,
    });
  } catch (err) {
    next(err);
  }
};

exports.getFAQs = async (req, res, next) => {
  try {
    const { category } = req.query;
    const faqs = knowledgeBaseService.getFAQs(category);
    return res.status(200).json({
      success: true,
      data: faqs,
    });
  } catch (err) {
    next(err);
  }
};
