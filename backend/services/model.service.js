/**
 * AI Model Registry & Version Control Service
 * NexoApps Platform - Phase 6C (Version 2.3)
 */

class ModelService {
  constructor() {
    this.models = [
      {
        id: 'mod-1',
        userId: 'usr-1',
        name: 'Nexo-LLM 7B Instruct',
        slug: 'nexo-llm-7b-instruct',
        taskType: 'LLM',
        framework: 'PyTorch / HuggingFace',
        description: 'Fine-tuned 7B parameter code and general assistant model for NexoApps Platform.',
        license: 'Apache-2.0',
        isPublic: true,
        versionsCount: 3,
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      },
      {
        id: 'mod-2',
        userId: 'usr-1',
        name: 'Batlytics Match Outcome Predictor',
        slug: 'batlytics-match-outcome-predictor',
        taskType: 'Tabular',
        framework: 'XGBoost / ONNX',
        description: 'Predictive cricket match outcome and score calculation model trained on 15,000 matches.',
        license: 'Proprietary',
        isPublic: true,
        versionsCount: 2,
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      },
    ];

    this.versions = [
      {
        id: 'ver-101',
        modelId: 'mod-1',
        version: 'v1.2.0',
        artifactPath: 's3://nexo-models/llm-7b/v1.2.0.onnx',
        parametersCount: '7 Billion',
        status: 'Active',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'ver-102',
        modelId: 'mod-2',
        version: 'v2.0.1',
        artifactPath: 's3://nexo-models/batlytics/v2.0.1.bin',
        parametersCount: '150 Million',
        status: 'Active',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  getModels() {
    return this.models;
  }

  getModelBySlug(slug) {
    return this.models.find((m) => m.slug === slug) || this.models[0];
  }

  registerModel(userId, data) {
    const slug = (data.name || 'ai-model').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newMod = {
      id: `mod-${Date.now()}`,
      userId: userId || 'usr-1',
      name: data.name || 'New AI Model',
      slug,
      taskType: data.taskType || 'LLM',
      framework: data.framework || 'PyTorch',
      description: data.description || 'Enterprise AI model registry artifact.',
      license: data.license || 'Apache-2.0',
      isPublic: true,
      versionsCount: 1,
      createdAt: new Date().toISOString(),
    };
    this.models.unshift(newMod);
    return newMod;
  }
}

module.exports = new ModelService();
