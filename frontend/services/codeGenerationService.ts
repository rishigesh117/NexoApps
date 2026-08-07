/**
 * Code Generation Service — NexoApps Phase 9D
 * Frontend API service for AI code generation & refactoring.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const codeGenerationService = {
  async generateCode(projectId: string, prompt: string, targetFilePath?: string) {
    const res = await fetch(`${API_BASE}/software-engineering/codegen/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, prompt, targetFilePath }),
    });
    return res.json();
  },
};
