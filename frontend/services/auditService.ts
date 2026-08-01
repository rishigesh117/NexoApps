import { fetchApi } from './apiClient';
import { AuditLogEntry } from '../types';

export async function getAuditLogs(): Promise<AuditLogEntry[]> {
  const res = await fetchApi<{ success: boolean; data: AuditLogEntry[] }>('/audit');
  return res.data || [];
}
