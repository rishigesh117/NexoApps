import { fetchApi } from './apiClient';
import { AIAgent, AgentSession, AgentMemory } from '../types';

export async function getAIAgents(): Promise<AIAgent[]> {
  const res = await fetchApi<{ success: boolean; data: AIAgent[] }>('/agents');
  return res.data || [];
}

export async function getAIAgentDetails(id: string): Promise<{ agent: AIAgent; memories: AgentMemory[] } | null> {
  const res = await fetchApi<{ success: boolean; data: { agent: AIAgent; memories: AgentMemory[] } }>(`/agents/${id}`);
  return res.data || null;
}

export async function sendAgentMessage(agentId: string, message: string): Promise<AgentSession> {
  const res = await fetchApi<{ success: boolean; data: AgentSession }>(`/agents/${agentId}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  return res.data;
}
