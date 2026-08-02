/**
 * Persistent Agent Memory & Context Service
 * NexoApps Platform - Phase 6B (Version 2.2)
 */

class AgentMemoryService {
  constructor() {
    this.memories = [
      {
        id: 'mem-1',
        agentId: 'ag-1',
        memoryKey: 'PREFERRED_FRAMEWORK',
        memoryValue: 'Next.js 14 App Router + TailwindCSS',
        importanceScore: 9,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'mem-2',
        agentId: 'ag-2',
        memoryKey: 'DEFAULT_SPRINT_DURATION',
        memoryValue: '14 Days (2 Weeks)',
        importanceScore: 8,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  getMemories(agentId) {
    if (agentId) return this.memories.filter((m) => m.agentId === agentId);
    return this.memories;
  }
}

module.exports = new AgentMemoryService();
