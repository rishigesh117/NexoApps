import { fetchApi } from './apiClient';
import { Dataset, FeatureStore } from '../../shared/types';

export const getDatasets = async (): Promise<Dataset[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: Dataset[] }>('/modelops/datasets/datasets');
    return res.data;
  } catch {
    return [
      { id: 'ds-101', datasetName: 'Customer Support Intent Classification Dataset', name: 'Customer Support Intent Classification Dataset', datasetType: 'text-classification', numRows: 500000, sizeBytes: 142000000, createdAt: new Date().toISOString() },
      { id: 'ds-102', datasetName: 'Financial Fraud Anomaly Detection Features', name: 'Financial Fraud Anomaly Detection Features', datasetType: 'tabular', numRows: 12000000, sizeBytes: 4800000000, createdAt: new Date().toISOString() }
    ];
  }
};

export const createDataset = async (data: any): Promise<Dataset> => {
  return {
    id: `ds-${Date.now()}`,
    userId: 'user-admin',
    name: data.name || 'New Dataset',
    datasetName: data.name || 'New Dataset',
    category: data.category || 'Tabular',
    datasetType: 'tabular',
    numRows: 10000,
    sizeBytes: 1000000,
    createdAt: new Date().toISOString()
  };
};

export const getFeatureStores = async (): Promise<FeatureStore[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: FeatureStore[] }>('/modelops/datasets/feature-stores');
    return res.data;
  } catch {
    return [
      { id: 'fs-1', storeName: 'Global Real-Time Feature Store', onlineEngine: 'Redis Cluster', offlineEngine: 'Apache Iceberg', createdAt: new Date().toISOString() }
    ];
  }
};

export const datasetService = {
  getDatasets,
  createDataset,
  getFeatureStores
};
