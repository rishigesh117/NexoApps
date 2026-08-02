import { fetchApi } from './apiClient';
import { ExportPackage } from '../types';

export async function exportAIProject(projectId: string, exportFormat: 'ZIP' | 'Next.js' | 'React' | 'Node.js'): Promise<ExportPackage> {
  const res = await fetchApi<{ success: boolean; data: ExportPackage }>('/builder/export', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId, exportFormat }),
  });
  return res.data;
}
