/**
 * Workflow Builder Service — NexoApps Phase 9B
 * Visual node-based workflow orchestration and event triggers.
 */

const { v4: uuidv4 } = require('uuid');

class WorkflowBuilderService {
  constructor() {
    this.workflows = [
      {
        id: 'wf-1',
        applicationId: 'app-demo-1',
        name: 'Support Ticket AI Triage & Resolution Workflow',
        triggerType: 'webhook_event',
        workflowNodes: [
          { id: 'node-1', type: 'trigger', label: 'Incoming Support Request', position: { x: 100, y: 100 } },
          { id: 'node-2', type: 'rag_search', label: 'Query Vector Knowledge Base', position: { x: 350, y: 100 } },
          { id: 'node-3', type: 'llm_generate', label: 'Generate Response via GPT-4o', position: { x: 600, y: 100 } },
          { id: 'node-4', type: 'action', label: 'Send Customer Reply', position: { x: 850, y: 100 } }
        ],
        workflowEdges: [
          { id: 'e1-2', source: 'node-1', target: 'node-2' },
          { id: 'e2-3', source: 'node-2', target: 'node-3' },
          { id: 'e3-4', source: 'node-3', target: 'node-4' }
        ],
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ];
  }

  async listWorkflows(applicationId) {
    if (applicationId) {
      return this.workflows.filter(w => w.applicationId === applicationId);
    }
    return this.workflows;
  }

  async saveWorkflow(data) {
    let wf = this.workflows.find(w => w.id === data.id);
    if (!wf) {
      wf = {
        id: `wf-${uuidv4().substring(0, 8)}`,
        applicationId: data.applicationId,
        name: data.name || 'New AI Workflow',
        triggerType: data.triggerType || 'event',
        workflowNodes: data.workflowNodes || [],
        workflowEdges: data.workflowEdges || [],
        isActive: true,
        createdAt: new Date().toISOString()
      };
      this.workflows.push(wf);
    } else {
      wf.name = data.name || wf.name;
      wf.workflowNodes = data.workflowNodes || wf.workflowNodes;
      wf.workflowEdges = data.workflowEdges || wf.workflowEdges;
    }
    return wf;
  }
}

module.exports = new WorkflowBuilderService();
