import { fetchApi } from './apiClient';
import { Experiment, ExperimentRun } from '../types';

export async function getExperiments(): Promise<{ experiments: Experiment[]; runs: ExperimentRun[] }> {
  const res = await fetchApi<{ success: boolean; data: { experiments: Experiment[]; runs: ExperimentRun[] } }>('/experiments');
  return res.data || { experiments: [], runs: [] };
}
