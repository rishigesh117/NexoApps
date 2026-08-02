/**
 * Dataset Library & Versioning Service
 * NexoApps Platform - Phase 6C (Version 2.3)
 */

class DatasetService {
  constructor() {
    this.datasets = [
      {
        id: 'ds-1',
        userId: 'usr-1',
        name: 'Cricket Ball-by-Ball Historical Match Dataset',
        category: 'Tabular / Sports',
        description: '15,000 professional match overs, ball outcomes, player stats, and ground weather data.',
        fileFormat: 'CSV / Parquet',
        sizeMb: 142.50,
        createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
      },
      {
        id: 'ds-2',
        userId: 'usr-1',
        name: 'Software Engineering Instruction Tuning Dataset',
        category: 'Text / Code',
        description: '50,000 TypeScript, React, and Express code generation prompt-response pairs.',
        fileFormat: 'JSONL',
        sizeMb: 85.20,
        createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
      },
    ];
  }

  getDatasets() {
    return this.datasets;
  }

  createDataset(userId, data) {
    const newDs = {
      id: `ds-${Date.now()}`,
      userId: userId || 'usr-1',
      name: data.name || 'New Dataset',
      category: data.category || 'Text Classification',
      description: data.description || 'Uploaded AI training dataset.',
      fileFormat: data.fileFormat || 'JSONL',
      sizeMb: data.sizeMb || 12.4,
      createdAt: new Date().toISOString(),
    };
    this.datasets.unshift(newDs);
    return newDs;
  }
}

module.exports = new DatasetService();
