/**
 * Model Registry Service — NexoApps Phase 11B (v8.2)
 * Centralized model registry, versioning, stage promotion (Dev -> Staging -> Prod), and artifacts.
 */

class ModelRegistryService {
  constructor() {
    this.models = [
      { id: 'mdl-101', modelName: 'Nexo-Llama-3.1-70B-Instruct-FineTuned', taskType: 'llm_generation', framework: 'transformers', isActive: true, createdAt: new Date().toISOString() },
      { id: 'mdl-102', modelName: 'Nexo-Embedding-v3-Large', taskType: 'text_embedding', framework: 'onnx', isActive: true, createdAt: new Date().toISOString() }
    ];
  }

  async getModels() {
    return this.models;
  }
}

module.exports = new ModelRegistryService();
