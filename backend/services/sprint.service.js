/**
 * AI Sprint Kanban Board Service
 * NexoApps Platform - Phase 6B (Version 2.2)
 */

class SprintService {
  constructor() {
    this.sprints = [
      {
        id: 'spr-1',
        name: 'Sprint 12 - AI Agent Collaboration',
        sprintGoal: 'Deliver autonomous development agents and sprint planning engine.',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0],
        status: 'Active',
        createdAt: new Date().toISOString(),
      },
    ];

    this.sprintTasks = [
      {
        id: 'st-1',
        sprintId: 'spr-1',
        taskTitle: 'Integrate Agent Memory Service into Express Backend',
        assignedTo: 'Nexus Lead Architect',
        status: 'Done',
        points: 5,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'st-2',
        sprintId: 'spr-1',
        taskTitle: 'Build Glassmorphic AI Sprint Kanban Board UI',
        assignedTo: 'Athena Scrum Master',
        status: 'In Progress',
        points: 3,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'st-3',
        sprintId: 'spr-1',
        taskTitle: 'Connect Bug Detector to Code Reviewer',
        assignedTo: 'Sentinel Security QA',
        status: 'To Do',
        points: 3,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  getSprints() {
    return this.sprints;
  }

  getSprintTasks(sprintId) {
    if (sprintId) return this.sprintTasks.filter((t) => t.sprintId === sprintId);
    return this.sprintTasks;
  }
}

module.exports = new SprintService();
