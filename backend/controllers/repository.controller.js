/**
 * Repository Controller — NexoApps Phase 11A (v8.1)
 */

const repositoryService = require('../services/repository.service');

class RepositoryController {
  async getRepositories(req, res) {
    try {
      const repos = await repositoryService.getRepositories();
      res.json({ success: true, data: repos });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getBranches(req, res) {
    try {
      const branches = await repositoryService.getBranches();
      res.json({ success: true, data: branches });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getMergeRequests(req, res) {
    try {
      const mrs = await repositoryService.getMergeRequests();
      res.json({ success: true, data: mrs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new RepositoryController();
