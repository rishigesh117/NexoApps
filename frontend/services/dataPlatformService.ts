/**
 * Data Platform Service — NexoApps Phase 7C
 * Frontend API client for Data Lake, ETL, Warehouse, and Data Sources.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const dataPlatformService = {
  // ETL
  async listETLJobs() {
    const res = await fetch(`${API_BASE}/etl/jobs`);
    return res.json();
  },
  async getETLJob(id: string) {
    const res = await fetch(`${API_BASE}/etl/jobs/${id}`);
    return res.json();
  },
  async createETLJob(data: any) {
    const res = await fetch(`${API_BASE}/etl/jobs`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    return res.json();
  },
  async runETLJob(id: string) {
    const res = await fetch(`${API_BASE}/etl/jobs/${id}/run`, { method: 'POST' });
    return res.json();
  },
  async getETLJobRuns(id: string) {
    const res = await fetch(`${API_BASE}/etl/jobs/${id}/runs`);
    return res.json();
  },
  async listPipelines() {
    const res = await fetch(`${API_BASE}/etl/pipelines`);
    return res.json();
  },

  // Warehouse / Data Sources
  async listDataSources() {
    const res = await fetch(`${API_BASE}/analytics-v2/data-sources`);
    return res.json();
  },
  async listWarehouseTables() {
    const res = await fetch(`${API_BASE}/analytics-v2/warehouse-tables`);
    return res.json();
  },
  async getDataQuality() {
    const res = await fetch(`${API_BASE}/analytics-v2/data-quality`);
    return res.json();
  },
  async getDatasetCatalog() {
    const res = await fetch(`${API_BASE}/analytics-v2/dataset-catalog`);
    return res.json();
  },
};
