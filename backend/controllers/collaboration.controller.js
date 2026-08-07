/**
 * Collaboration Controller — NexoApps Phase 11D (v8.4)
 * Handles document libraries, whiteboards, projects, analytics, feeds, notifications, and logs.
 */

const documentService = require('../services/document.service');
const whiteboardService = require('../services/whiteboard.service');
const projectService = require('../services/project_collaboration.service');
const analyticsService = require('../services/collaboration_analytics.service');

class CollaborationController {
  // Document endpoints
  async getDocumentLibraries(req, res) {
    try {
      const libraries = await documentService.getDocumentLibraries(req.query.workspaceId);
      res.json({ success: true, data: libraries });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createDocumentLibrary(req, res) {
    try {
      const lib = await documentService.createDocumentLibrary(req.body);
      res.status(201).json({ success: true, data: lib });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getSharedDocuments(req, res) {
    try {
      const docs = await documentService.getSharedDocuments(req.query.libraryId);
      res.json({ success: true, data: docs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createSharedDocument(req, res) {
    try {
      const doc = await documentService.createSharedDocument(req.body);
      res.status(201).json({ success: true, data: doc });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // Whiteboard endpoints
  async getWhiteboards(req, res) {
    try {
      const boards = await whiteboardService.getWhiteboards(req.query.workspaceId);
      res.json({ success: true, data: boards });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createWhiteboard(req, res) {
    try {
      const board = await whiteboardService.createWhiteboard(req.body);
      res.status(201).json({ success: true, data: board });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getWhiteboardObjects(req, res) {
    try {
      const objects = await whiteboardService.getWhiteboardObjects(req.params.id);
      res.json({ success: true, data: objects });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async addWhiteboardObject(req, res) {
    try {
      const obj = await whiteboardService.addObject({ ...req.body, whiteboardId: req.params.id });
      res.status(201).json({ success: true, data: obj });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // Project Collaboration endpoints
  async getProjectSpaces(req, res) {
    try {
      const projects = await projectService.getProjectSpaces(req.query.workspaceId);
      res.json({ success: true, data: projects });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createProjectSpace(req, res) {
    try {
      const project = await projectService.createProjectSpace(req.body);
      res.status(201).json({ success: true, data: project });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getProjectTasks(req, res) {
    try {
      const tasks = await projectService.getProjectTasks(req.query.projectSpaceId);
      res.json({ success: true, data: tasks });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createProjectTask(req, res) {
    try {
      const task = await projectService.createProjectTask(req.body);
      res.status(201).json({ success: true, data: task });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // Collaboration Analytics & Notifications endpoints
  async getAnalytics(req, res) {
    try {
      const data = await analyticsService.getAnalytics(req.query.workspaceId || 'ws-main');
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getTeamNotifications(req, res) {
    try {
      const data = await analyticsService.getTeamNotifications(req.query.recipientId || 'user-admin');
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getAuditLogs(req, res) {
    try {
      const data = await analyticsService.getAuditLogs(req.query.workspaceId || 'ws-main');
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new CollaborationController();
