/**
 * Dataset Service — NexoApps Phase 11B (v8.2)
 * ML Dataset management, version snapshots, and annotations.
 */

class DatasetService {
  constructor() {
    this.datasets = [
      { id: 'ds-101', datasetName: 'Customer Support Intent Classification Dataset', datasetType: 'text-classification', numRows: 500000, sizeBytes: 142000000, createdAt: new Date().toISOString() },
      { id: 'ds-102', datasetName: 'Financial Fraud Anomaly Detection Features', datasetType: 'tabular', numRows: 12000000, sizeBytes: 4800000000, createdAt: new Date().toISOString() }
    ];
  }

  async getDatasets() {
    return this.datasets;
  }
}

module.exports = new DatasetService();
