import { fetchApi } from './apiClient';
import { PlatformHealth, AutomationRule } from '../types';

export async function getPlatformHealth(): Promise<PlatformHealth> {
  const res = await fetchApi<{ success: boolean; data: PlatformHealth }>('/platform/health');
  return res.data;
}

export async function getAutomationRules(): Promise<AutomationRule[]> {
  const res = await fetchApi<{ success: boolean; data: AutomationRule[] }>('/automation-rules');
  return res.data || [];
}
