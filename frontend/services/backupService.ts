import { BackupPolicy, BackupJob } from '../../shared/types';

export const getDatabaseBackups = async (): Promise<{ policies: BackupPolicy[]; jobs: BackupJob[] }> => {
  return {
    policies: [
      { id: 'bp-1', policyName: 'Production Daily Full Backup & Continuous WAL', backupType: 'full_daily_pitr', retentionDays: 30, scheduleCron: '0 2 * * *', createdAt: new Date().toISOString() }
    ],
    jobs: [
      { id: 'bj-1', clusterId: 'dbc-1', policyId: 'bp-1', status: 'completed', sizeBytes: 15482880000, createdAt: new Date().toISOString() }
    ]
  };
};
