/**
 * AI Agent Core Registry & Chat Controller Service
 * NexoApps Platform - Phase 6B (Version 2.2)
 */

class AIAgentService {
  constructor() {
    this.agents = [
      {
        id: 'ag-1',
        name: 'Nexus Lead Architect',
        role: 'Software Engineer',
        avatar: '🤖',
        description: 'Autonomous full-stack engineer specialized in Next.js 14, Express APIs, and PostgreSQL schema design.',
        capabilities: ['Code Scaffolding', 'API Design', 'Performance Tuning'],
        status: 'Active',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'ag-2',
        name: 'Athena Scrum Master',
        role: 'Project Planner',
        avatar: '📊',
        description: 'Automated sprint planner, requirement analyzer, and project timeline estimator.',
        capabilities: ['Sprint Planning', 'Task Estimation', 'Requirement Breakdown'],
        status: 'Active',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'ag-3',
        name: 'Sentinel Security QA',
        role: 'QA Lead',
        avatar: '🛡️',
        description: 'Automated bug detector, vulnerability scanner, and unit test generator.',
        capabilities: ['Static Analysis', 'Bug Detection', 'Security Audits'],
        status: 'Active',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'ag-4',
        name: 'Hyperion Code Reviewer',
        role: 'Code Reviewer',
        avatar: '👁️',
        description: 'Automated PR reviewer, code quality scoring engine, and refactoring advisor.',
        capabilities: ['PR Review', 'Style Linting', 'Architecture Rating'],
        status: 'Active',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'ag-5',
        name: 'Scribe Technical Writer',
        role: 'Tech Writer',
        avatar: '✍️',
        description: 'Automated README, OpenAPI documentation, and user manual author.',
        capabilities: ['OpenAPI Generation', 'Markdown Docs', 'Release Notes'],
        status: 'Active',
        createdAt: new Date().toISOString(),
      },
    ];

    this.sessions = [
      {
        id: 'ses-101',
        agentId: 'ag-1',
        userId: 'usr-1',
        sessionTitle: 'Cricket Scoring App Architecture Session',
        messages: [
          { sender: 'user', text: 'Hi Nexus, plan the database schema for live ball-by-ball cricket scoring.', timestamp: new Date(Date.now() - 3600000).toISOString() },
          { sender: 'agent', text: 'Certainly! I recommend creating matches, innings, overs, and balls tables indexed on match_id and timestamp.', timestamp: new Date(Date.now() - 3500000).toISOString() },
        ],
        createdAt: new Date().toISOString(),
      },
    ];
  }

  getAgents() {
    return this.agents;
  }

  getAgentById(id) {
    return this.agents.find((a) => a.id === id) || null;
  }

  getSessions(userId) {
    return this.sessions;
  }

  sendAgentChatMessage(agentId, userId, messageText) {
    let session = this.sessions.find((s) => s.agentId === agentId && s.userId === userId);
    if (!session) {
      session = {
        id: `ses-${Date.now()}`,
        agentId,
        userId: userId || 'usr-1',
        sessionTitle: 'AI Agent Consultation',
        messages: [],
        createdAt: new Date().toISOString(),
      };
      this.sessions.unshift(session);
    }

    session.messages.push({
      sender: 'user',
      text: messageText,
      timestamp: new Date().toISOString(),
    });

    const agent = this.getAgentById(agentId);
    const agentReply = `[${agent ? agent.name : 'AI Agent'}]: I have processed your request ("${messageText}"). Generating optimal implementation and updating persistent memory store.`;

    session.messages.push({
      sender: 'agent',
      text: agentReply,
      timestamp: new Date().toISOString(),
    });

    return session;
  }
}

module.exports = new AIAgentService();
