/**
 * Agent Execution Controller — NexoApps Phase 8A
 */

const agentExecutionService = require('../services/agent_execution.service');
const agentToolsService = require('../services/agent_tools.service');
const agentSchedulerService = require('../services/agent_scheduler.service');

const agentExecutionController = {
  async listExecutions(req, res) {
    try {
      const executions = await agentExecutionService.listExecutions(req.params.agentId || 'all');
      res.json({ success: true, data: executions });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async runExecution(req, res) {
    try {
      const result = await agentExecutionService.runExecution(req.params.agentId, req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listTools(req, res) {
    try {
      const tools = await agentToolsService.listTools();
      res.json({ success: true, data: tools });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async invokeTool(req, res) {
    try {
      const result = await agentToolsService.invokeTool(req.body.toolName, req.params.agentId, req.body.arguments);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listSchedules(req, res) {
    try {
      const schedules = await agentSchedulerService.listSchedules(req.params.agentId);
      res.json({ success: true, data: schedules });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createSchedule(req, res) {
    try {
      const schedule = await agentSchedulerService.createSchedule(req.body);
      res.status(201).json({ success: true, data: schedule });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = agentExecutionController;
