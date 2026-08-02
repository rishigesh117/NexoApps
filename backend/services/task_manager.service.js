/**
 * Development Task Manager Service
 * NexoApps Platform - Phase 6B (Version 2.2)
 */

class TaskManagerService {
  constructor() {
    this.tasks = [
      {
        id: 'tsk-101',
        planId: 'plan-1',
        title: 'Design PostgreSQL schema for ball-by-ball cricket matches',
        assignedAgentId: 'ag-1',
        category: 'Database',
        status: 'Done',
        estimatedHours: 6,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'tsk-102',
        planId: 'plan-1',
        title: 'Implement Express REST API for live match scorecards',
        assignedAgentId: 'ag-1',
        category: 'Backend',
        status: 'In Progress',
        estimatedHours: 8,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'tsk-103',
        planId: 'plan-1',
        title: 'Build Next.js score updates component with Glassmorphism',
        assignedAgentId: 'ag-1',
        category: 'Frontend',
        status: 'To Do',
        estimatedHours: 5,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  getTasks(planId) {
    if (planId) return this.tasks.filter((t) => t.planId === planId);
    return this.tasks;
  }
}

module.exports = new TaskManagerService();
