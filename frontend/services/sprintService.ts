import { fetchApi } from './apiClient';
import { SprintBoard, SprintTask } from '../types';

export async function getSprints(): Promise<{ sprints: SprintBoard[]; tasks: SprintTask[] }> {
  const res = await fetchApi<{ success: boolean; data: { sprints: SprintBoard[]; tasks: SprintTask[] } }>('/sprints');
  return res.data || { sprints: [], tasks: [] };
}
