/**
 * Runtime Backup Service — NexoApps Phase 8B
 * Frontend API client for Instance Snapshots and Environment Backups.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const runtimeBackupService = {
  async listSnapshots(instanceId: string = 'all') {
    const res = await fetch(`${API_BASE}/runtime-backup/snapshots/${instanceId}`);
    return res.json();
  },
  async createSnapshot(instanceId: string, snapshotName?: string) {
    const res = await fetch(`${API_BASE}/runtime-backup/snapshots/${instanceId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ snapshotName }),
    });
    return res.json();
  },
  async listBackups(environmentId: string = 'all') {
    const res = await fetch(`${API_BASE}/runtime-backup/backups/${environmentId}`);
    return res.json();
  },
  async createBackup(environmentId: string, backupName?: string) {
    const res = await fetch(`${API_BASE}/runtime-backup/backups/${environmentId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ backupName }),
    });
    return res.json();
  },
};
