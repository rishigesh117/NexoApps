/**
 * OpenAPI / Swagger Specification Service
 * NexoApps Platform - Phase 7B (Version 3.1)
 */

class ApiDocumentationService {
  getOpenApiSpec() {
    return {
      openapi: '3.0.0',
      info: {
        title: 'NexoApps Enterprise Platform API',
        version: '3.1.0',
        description: 'REST API Gateway endpoints for AI Builder, Autonomous Agents, Model Deployments, SaaS Billing, and Webhooks.',
      },
      paths: {
        '/api/v1/health': { get: { summary: 'Health check' } },
        '/api/v1/builder/projects': { get: { summary: 'List AI Builder Projects' } },
        '/api/v1/agents': { get: { summary: 'List Autonomous AI Agents' } },
        '/api/v1/ai-deployments': { get: { summary: 'List Inference Deployments' } },
      },
    };
  }
}

module.exports = new ApiDocumentationService();
