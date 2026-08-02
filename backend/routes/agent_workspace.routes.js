/**
 * Agent Workspace Routes — NexoApps Phase 8A
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const agentWorkspaceController = require('../controllers/agent_workspace.controller');

router.get('/', optionalAuthToken, agentWorkspaceController.listWorkspaces);
router.get('/:id', optionalAuthToken, agentWorkspaceController.getWorkspace);
router.post('/', optionalAuthToken, agentWorkspaceController.createWorkspace);
router.get('/:id/agents', optionalAuthToken, agentWorkspaceController.listWorkspaceAgents);
router.post('/:id/agents', optionalAuthToken, agentWorkspaceController.addAgentToWorkspace);
router.get('/:id/collaboration-sessions', optionalAuthToken, agentWorkspaceController.listCollaborationSessions);
router.get('/sessions/:sessionId/conversations', optionalAuthToken, agentWorkspaceController.getCollaborationConversations);

module.exports = router;
