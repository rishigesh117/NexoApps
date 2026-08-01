import { fetchApi } from './apiClient';
import { JobSchedule, NotificationQueueStatus } from '../types';

export async function getQueueStatus(): Promise<NotificationQueueStatus> {
  const res = await fetchApi<{ success: boolean; data: NotificationQueueStatus }>('/operations/queue');
  return res.data;
}

export async function getJobs(): Promise<JobSchedule[]> {
  const res = await fetchApi<{ success: boolean; data: JobSchedule[] }>('/operations/jobs');
  return res.data || [];
}
