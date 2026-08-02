/**
 * Export Package Service
 * NexoApps Platform - Phase 6A (Version 2.1)
 */

class ExportService {
  createExportPackage(projectId, exportFormat = 'Next.js') {
    return {
      id: `exp-${Date.now()}`,
      projectId,
      userId: 'usr-1',
      exportFormat,
      downloadUrl: `/api/v1/builder/export/download/${projectId}?format=${exportFormat}`,
      sizeBytes: 12500000,
      createdAt: new Date().toISOString(),
    };
  }
}

module.exports = new ExportService();
