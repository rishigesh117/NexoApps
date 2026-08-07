/**
 * Prompt Service — NexoApps Phase 9A
 * Manages prompt templates, versioning, variable substitution, and prompt library.
 */

const { v4: uuidv4 } = require('uuid');

class PromptService {
  constructor() {
    this.templates = [
      {
        id: 'prompt-1',
        title: 'System Architecture Specification',
        slug: 'system-arch-spec',
        description: 'Generates detailed enterprise cloud component architecture specifications.',
        category: 'Engineering',
        tags: ['Architecture', 'Cloud', 'System Design'],
        isPublic: true,
        authorId: 'user-owner',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'prompt-2',
        title: 'Security Compliance & Vulnerability Audit',
        slug: 'security-compliance-audit',
        description: 'Analyzes code diffs for OWASP Top 10 vulnerabilities & compliance risks.',
        category: 'Security',
        tags: ['Security', 'Audit', 'OWASP'],
        isPublic: true,
        authorId: 'user-owner',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    this.versions = [
      {
        id: 'pv-1',
        templateId: 'prompt-1',
        versionNumber: 1,
        templateContent: 'Act as a Lead Systems Architect. Analyze the following target requirements: {{requirements}}. Generate component diagram specifications, data flow, and SLA metrics.',
        variables: ['requirements'],
        commitMessage: 'Initial release of architecture template',
        createdAt: new Date().toISOString()
      },
      {
        id: 'pv-2',
        templateId: 'prompt-2',
        versionNumber: 1,
        templateContent: 'Inspect the code payload: {{code_diff}}. Evaluate potential vulnerabilities against framework {{compliance_framework}}. Output structured remediation advice.',
        variables: ['code_diff', 'compliance_framework'],
        commitMessage: 'Initial release of security audit template',
        createdAt: new Date().toISOString()
      }
    ];
  }

  async listTemplates() {
    return this.templates;
  }

  async getTemplateById(id) {
    const template = this.templates.find(t => t.id === id || t.slug === id);
    if (!template) return null;
    const versions = this.versions.filter(v => v.templateId === template.id);
    return { ...template, versions };
  }

  async createTemplate(data) {
    const templateId = `prompt-${uuidv4().substring(0, 8)}`;
    const template = {
      id: templateId,
      title: data.title,
      slug: data.slug || data.title.toLowerCase().replace(/\s+/g, '-'),
      description: data.description || '',
      category: data.category || 'General',
      tags: data.tags || [],
      isPublic: data.isPublic !== undefined ? data.isPublic : true,
      authorId: data.authorId || 'user-owner',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.templates.push(template);

    const version = {
      id: `pv-${uuidv4().substring(0, 8)}`,
      templateId: templateId,
      versionNumber: 1,
      templateContent: data.templateContent || 'Enter system prompt here...',
      variables: data.variables || [],
      commitMessage: 'Initial version',
      createdAt: new Date().toISOString()
    };
    this.versions.push(version);

    return { ...template, versions: [version] };
  }

  async addVersion(templateId, data) {
    const existingVersions = this.versions.filter(v => v.templateId === templateId);
    const nextVer = existingVersions.length + 1;
    const version = {
      id: `pv-${uuidv4().substring(0, 8)}`,
      templateId,
      versionNumber: nextVer,
      templateContent: data.templateContent,
      variables: data.variables || [],
      commitMessage: data.commitMessage || `Version ${nextVer} update`,
      createdAt: new Date().toISOString()
    };
    this.versions.push(version);
    return version;
  }
}

module.exports = new PromptService();
