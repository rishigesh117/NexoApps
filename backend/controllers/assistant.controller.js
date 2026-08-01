/**
 * AI Assistant Controller
 * NexoApps Platform - Phase 5B
 */

const aiAssistantService = require('../services/ai_assistant.service');

exports.getChatHistory = async (req, res, next) => {
  try {
    const { conversationId } = req.query;
    const conversation = aiAssistantService.getConversation(conversationId);
    return res.status(200).json({
      success: true,
      data: conversation,
    });
  } catch (err) {
    next(err);
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const { conversationId, text } = req.body;
    const userRole = req.user?.role || 'GUEST';
    const result = aiAssistantService.sendMessage(conversationId, text, userRole);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
