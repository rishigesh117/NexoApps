/**
 * Artifact Controller — NexoApps Phase 11A (v8.1)
 */

const artifactService = require('../services/artifact.service');
const containerRegistryService = require('../services/container_registry.service');

class ArtifactController {
  async getArtifacts(req, res) {
    try {
      const artifacts = await artifactService.getArtifacts();
      res.json({ success: true, data: artifacts });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getContainerImages(req, res) {
    try {
      const images = await containerRegistryService.getImages();
      res.json({ success: true, data: images });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new ArtifactController();
