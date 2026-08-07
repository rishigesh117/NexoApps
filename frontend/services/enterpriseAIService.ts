import { fetchApi } from './apiClient';
import { EnterpriseAIService, EnterpriseAIAgent } from '../../shared/types';

export const getEnterpriseAIHub = async (): Promise<{ aiServices: EnterpriseAIService[]; aiAgents: EnterpriseAIAgent[] }> => {
  try {
    const res = await fetchApi<{ success: boolean; data: { aiServices: EnterpriseAIService[]; aiAgents: EnterpriseAIAgent[] } }>('/enterprise/admin/ai-hub');
    return res.data;
  } catch {
    return {
      aiServices: [
        { id: 'ais-1', serviceName: 'Universal Enterprise LLM Gateway', modelProvider: 'anthropic', status: 'active', createdAt: new Date().toISOString() },
        { id: 'ais-2', serviceName: 'Vector Embedding RAG Pipeline', modelProvider: 'openai', status: 'active', createdAt: new Date().toISOString() }
      ],
      aiAgents: [
        { id: 'agent-1', agentName: 'Enterprise System Orchestrator Agent', roleType: 'autonomous_assistant', status: 'active', createdAt: new Date().toISOString() },
        { id: 'agent-2', agentName: 'Security & Compliance Monitor Agent', roleType: 'security_auditor', status: 'active', createdAt: new Date().toISOString() }
      ]
    };
  }
};

export const enterpriseAIService = {
  getEnterpriseAIHub
};
