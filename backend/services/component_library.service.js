/**
 * Component Library Service — NexoApps Phase 9B
 * Catalog of reusable low-code AI blocks (Prompts, Models, APIs, DB, Forms, Voice, RAG, Agents).
 */

const { v4: uuidv4 } = require('uuid');

class ComponentLibraryService {
  constructor() {
    this.components = [
      { id: 'lib-1', name: 'AI Model Selector Block', componentType: 'model_selector', category: 'AI Core', iconName: 'Sparkles', defaultProps: { modelKey: 'gpt-4o' }, isPublished: true, createdAt: new Date().toISOString() },
      { id: 'lib-2', name: 'Interactive Chatbot Canvas', componentType: 'chatbot_builder', category: 'AI Core', iconName: 'Bot', defaultProps: { systemPrompt: 'Helpful Assistant' }, isPublished: true, createdAt: new Date().toISOString() },
      { id: 'lib-3', name: 'Prompt Component Block', componentType: 'prompt_block', category: 'Prompts', iconName: 'BookOpen', defaultProps: { templateId: 'prompt-1' }, isPublished: true, createdAt: new Date().toISOString() },
      { id: 'lib-4', name: 'Image Generation Studio', componentType: 'image_gen_block', category: 'Multimodal', iconName: 'Image', defaultProps: { resolution: '1024x1024' }, isPublished: true, createdAt: new Date().toISOString() },
      { id: 'lib-5', name: 'Knowledge Base RAG Connector', componentType: 'knowledge_base_block', category: 'Data & RAG', iconName: 'Database', defaultProps: { indexName: 'enterprise-docs' }, isPublished: true, createdAt: new Date().toISOString() },
      { id: 'lib-6', name: 'Voice AI TTS/STT Block', componentType: 'voice_ai_block', category: 'Multimodal', iconName: 'Mic', defaultProps: { defaultVoice: 'alloy' }, isPublished: true, createdAt: new Date().toISOString() },
      { id: 'lib-7', name: 'Autonomous AI Agent Node', componentType: 'agent_node', category: 'Agents', iconName: 'Cpu', defaultProps: { maxSteps: 10 }, isPublished: true, createdAt: new Date().toISOString() },
      { id: 'lib-8', name: 'REST API Connector Block', componentType: 'api_connector', category: 'Integrations', iconName: 'Globe', defaultProps: { method: 'POST' }, isPublished: true, createdAt: new Date().toISOString() },
      { id: 'lib-9', name: 'Form & Input Builder', componentType: 'form_builder', category: 'UI Elements', iconName: 'Sliders', defaultProps: { fields: [] }, isPublished: true, createdAt: new Date().toISOString() },
      { id: 'lib-10', name: 'Analytics Chart & KPI Display', componentType: 'dashboard_chart', category: 'Analytics', iconName: 'BarChart3', defaultProps: { chartType: 'bar' }, isPublished: true, createdAt: new Date().toISOString() }
    ];

    this.categories = [
      { id: 'cat-1', name: 'AI Core', description: 'Model selectors, completion blocks, and streaming logic' },
      { id: 'cat-2', name: 'Multimodal', description: 'Image generation, vision analysis, TTS/STT voice blocks' },
      { id: 'cat-3', name: 'Data & RAG', description: 'Knowledge bases, vector store query blocks, SQL connectors' },
      { id: 'cat-4', name: 'Agents', description: 'Multi-agent orchestration nodes and task executors' },
      { id: 'cat-5', name: 'UI Elements', description: 'Forms, buttons, charts, file upload components' }
    ];
  }

  async listComponents() {
    return this.components;
  }

  async listCategories() {
    return this.categories;
  }

  async createComponent(data) {
    const comp = {
      id: `lib-${uuidv4().substring(0, 8)}`,
      name: data.name,
      componentType: data.componentType,
      category: data.category || 'AI Core',
      iconName: data.iconName || 'Box',
      defaultProps: data.defaultProps || {},
      isPublished: true,
      createdAt: new Date().toISOString()
    };
    this.components.push(comp);
    return comp;
  }
}

module.exports = new ComponentLibraryService();
