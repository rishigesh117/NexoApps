/**
 * Provider Manager Service — NexoApps Phase 9A
 * Manages AI provider configurations, credentials, models, and rate limits.
 */

const { v4: uuidv4 } = require('uuid');

class ProviderManagerService {
  constructor() {
    this.providers = [
      { id: 'prov-openai', name: 'OpenAI', slug: 'openai', providerType: 'openai', apiBaseUrl: 'https://api.openai.com/v1', isActive: true, healthStatus: 'healthy', config: { organization: 'org-nexo' }, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'prov-anthropic', name: 'Anthropic Claude', slug: 'anthropic', providerType: 'anthropic', apiBaseUrl: 'https://api.anthropic.com/v1', isActive: true, healthStatus: 'healthy', config: { version: '2023-06-01' }, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'prov-gemini', name: 'Google Gemini', slug: 'gemini', providerType: 'gemini', apiBaseUrl: 'https://generativelanguage.googleapis.com/v1beta', isActive: true, healthStatus: 'healthy', config: {}, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'prov-xai', name: 'xAI Grok', slug: 'xai', providerType: 'xai', apiBaseUrl: 'https://api.x.ai/v1', isActive: true, healthStatus: 'healthy', config: {}, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'prov-mistral', name: 'Mistral AI', slug: 'mistral', providerType: 'mistral', apiBaseUrl: 'https://api.mistral.ai/v1', isActive: true, healthStatus: 'healthy', config: {}, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'prov-groq', name: 'Groq Cloud', slug: 'groq', providerType: 'groq', apiBaseUrl: 'https://api.groq.com/openai/v1', isActive: true, healthStatus: 'healthy', config: {}, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'prov-ollama', name: 'Ollama (Local Models)', slug: 'ollama', providerType: 'ollama', apiBaseUrl: 'http://localhost:11434', isActive: true, healthStatus: 'healthy', config: {}, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'prov-azure', name: 'Azure OpenAI', slug: 'azure', providerType: 'azure', apiBaseUrl: 'https://nexo.openai.azure.com/', isActive: true, healthStatus: 'healthy', config: { apiVersion: '2024-02-01' }, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'prov-bedrock', name: 'AWS Bedrock', slug: 'bedrock', providerType: 'bedrock', apiBaseUrl: 'https://bedrock-runtime.us-east-1.amazonaws.com', isActive: true, healthStatus: 'healthy', config: { region: 'us-east-1' }, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'prov-huggingface', name: 'Hugging Face Hub', slug: 'huggingface', providerType: 'huggingface', apiBaseUrl: 'https://api-inference.huggingface.co', isActive: true, healthStatus: 'healthy', config: {}, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'prov-together', name: 'Together AI', slug: 'together', providerType: 'together', apiBaseUrl: 'https://api.together.xyz/v1', isActive: true, healthStatus: 'healthy', config: {}, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'prov-openrouter', name: 'OpenRouter Gateway', slug: 'openrouter', providerType: 'openrouter', apiBaseUrl: 'https://openrouter.ai/api/v1', isActive: true, healthStatus: 'healthy', config: {}, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'prov-custom', name: 'Custom REST AI Provider', slug: 'custom-rest', providerType: 'custom', apiBaseUrl: 'https://custom-ai.internal/api', isActive: true, healthStatus: 'healthy', config: {}, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ];

    this.models = [
      { id: 'mod-gpt4o', providerId: 'prov-openai', modelName: 'GPT-4o Omnimodal', modelKey: 'gpt-4o', contextWindow: 128000, maxOutputTokens: 4096, inputCostPer1k: 0.0025, outputCostPer1k: 0.01, supportsVision: true, supportsAudio: true, supportsFunctionCalling: true, supportsStreaming: true, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'mod-claude35', providerId: 'prov-anthropic', modelName: 'Claude 3.5 Sonnet', modelKey: 'claude-3-5-sonnet-20241022', contextWindow: 200000, maxOutputTokens: 8192, inputCostPer1k: 0.003, outputCostPer1k: 0.015, supportsVision: true, supportsAudio: false, supportsFunctionCalling: true, supportsStreaming: true, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'mod-gemini15', providerId: 'prov-gemini', modelName: 'Gemini 1.5 Pro', modelKey: 'gemini-1.5-pro', contextWindow: 2000000, maxOutputTokens: 8192, inputCostPer1k: 0.00125, outputCostPer1k: 0.005, supportsVision: true, supportsAudio: true, supportsFunctionCalling: true, supportsStreaming: true, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'mod-grok2', providerId: 'prov-xai', modelName: 'Grok 2', modelKey: 'grok-2', contextWindow: 128000, maxOutputTokens: 4096, inputCostPer1k: 0.002, outputCostPer1k: 0.01, supportsVision: true, supportsAudio: false, supportsFunctionCalling: true, supportsStreaming: true, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'mod-llama3', providerId: 'prov-groq', modelName: 'Llama 3.3 70B (Groq)', modelKey: 'llama-3.3-70b-versatile', contextWindow: 128000, maxOutputTokens: 32768, inputCostPer1k: 0.00059, outputCostPer1k: 0.00079, supportsVision: false, supportsAudio: false, supportsFunctionCalling: true, supportsStreaming: true, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'mod-ollama-llama', providerId: 'prov-ollama', modelName: 'Llama 3.1 8B (Local)', modelKey: 'llama3.1:8b', contextWindow: 32768, maxOutputTokens: 4096, inputCostPer1k: 0.0, outputCostPer1k: 0.0, supportsVision: false, supportsAudio: false, supportsFunctionCalling: true, supportsStreaming: true, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    ];

    this.credentials = [
      { id: 'cred-openai-prod', providerId: 'prov-openai', keyName: 'OpenAI Production Key', apiKeyEncrypted: 'sk-proj-****-masked-8f92a', environment: 'production', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'cred-anthropic-prod', providerId: 'prov-anthropic', keyName: 'Anthropic Production Key', apiKeyEncrypted: 'sk-ant-****-masked-3b7c', environment: 'production', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'cred-gemini-prod', providerId: 'prov-gemini', keyName: 'Gemini Production Key', apiKeyEncrypted: 'AIzaSy****-masked-910x', environment: 'production', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    ];
  }

  async listProviders() {
    return this.providers;
  }

  async getProviderById(id) {
    return this.providers.find(p => p.id === id || p.slug === id);
  }

  async createProvider(data) {
    const newProv = {
      id: `prov-${uuidv4().substring(0, 8)}`,
      name: data.name,
      slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
      providerType: data.providerType || 'custom',
      apiBaseUrl: data.apiBaseUrl || '',
      isActive: data.isActive !== undefined ? data.isActive : true,
      healthStatus: 'healthy',
      config: data.config || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.providers.push(newProv);
    return newProv;
  }

  async listModels(providerId) {
    if (providerId) {
      return this.models.filter(m => m.providerId === providerId);
    }
    return this.models;
  }

  async listCredentials() {
    return this.credentials;
  }

  async addCredential(data) {
    const cred = {
      id: `cred-${uuidv4().substring(0, 8)}`,
      providerId: data.providerId,
      keyName: data.keyName,
      apiKeyEncrypted: `sk-enc-${uuidv4().substring(0, 8)}`,
      environment: data.environment || 'production',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.credentials.push(cred);
    return cred;
  }
}

module.exports = new ProviderManagerService();
