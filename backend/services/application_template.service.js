/**
 * Application Template Service — NexoApps Phase 9B
 * Template marketplace & pre-built AI starter apps.
 */

const { v4: uuidv4 } = require('uuid');

class ApplicationTemplateService {
  constructor() {
    this.templates = [
      {
        id: 'tmpl-1',
        name: 'Enterprise Customer Support Copilot',
        slug: 'support-copilot-starter',
        description: 'Multi-channel AI chatbot with document RAG knowledge base & agent escalation.',
        category: 'Customer Support',
        thumbnailUrl: '/assets/templates/support-copilot.png',
        templatePayload: JSON.stringify({ pages: [{ title: 'Main Chat' }], components: [{ type: 'chatbot_builder' }] }),
        isFeatured: true,
        usageCount: 1420,
        createdAt: new Date().toISOString()
      },
      {
        id: 'tmpl-2',
        name: 'AI Content & Image Generator Studio',
        slug: 'content-studio-starter',
        description: 'Unified studio for article writing, DALL-E image synthesis, and TTS audio exports.',
        category: 'Marketing & Content',
        thumbnailUrl: '/assets/templates/content-studio.png',
        templatePayload: JSON.stringify({ pages: [{ title: 'Editor Studio' }], components: [{ type: 'image_gen_block' }] }),
        isFeatured: true,
        usageCount: 890,
        createdAt: new Date().toISOString()
      },
      {
        id: 'tmpl-3',
        name: 'Autonomous Code Auditor & Refactor Bot',
        slug: 'code-auditor-starter',
        description: 'Analyzes GitHub diffs for OWASP security vulnerabilities & generates code fixes.',
        category: 'Engineering',
        thumbnailUrl: '/assets/templates/code-auditor.png',
        templatePayload: JSON.stringify({ pages: [{ title: 'Code Diff Inspector' }], components: [{ type: 'prompt_block' }] }),
        isFeatured: true,
        usageCount: 2150,
        createdAt: new Date().toISOString()
      }
    ];
  }

  async listTemplates() {
    return this.templates;
  }

  async getTemplateById(id) {
    return this.templates.find(t => t.id === id || t.slug === id);
  }

  async createTemplate(data) {
    const tmpl = {
      id: `tmpl-${uuidv4().substring(0, 8)}`,
      name: data.name,
      slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
      description: data.description || '',
      category: data.category || 'General',
      thumbnailUrl: data.thumbnailUrl || '/assets/templates/default.png',
      templatePayload: JSON.stringify(data.templatePayload || {}),
      isFeatured: data.isFeatured || false,
      usageCount: 0,
      createdAt: new Date().toISOString()
    };
    this.templates.push(tmpl);
    return tmpl;
  }
}

module.exports = new ApplicationTemplateService();
