/**
 * AI Agent Controller
 * NexoApps Platform - Phase 6B (Version 2.2)
 */

const aiAgentService = require('../services/ai_agent.service');
const agentMemoryService = require('../services/agent_memory.service');

exports.getAgents = async (req, res, next) => {
  try {
    const agents = aiAgentService.getAgents();
    return res.status(200).json({
      success: true,
      data: agents,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAgentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const agent = aiAgentService.getAgentById(id);
    if (!agent) return res.status(404).json({ success: false, message: 'Agent not found' });
    const memories = agentMemoryService.getMemories(id);
    return res.status(200).json({
      success: true,
      data: { agent, memories },
    });
  } catch (err) {
    next(err);
  }
};

exports.chatWithAgent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const session = aiAgentService.sendAgentChatMessage(id, req.user?.id, message);
    return res.status(200).json({
      success: true,
      data: session,
    });
  } catch (err) {
    next(err);
  }
};
