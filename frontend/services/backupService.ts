/**
 * Backup Service — NexoApps Phase 7D
 * Frontend API client for System Backups and Restore Wizard.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const backupService = {
  async listSystemBackups() {
    const res = await fetch(`${API_BASE}/backups/system`);
    return res.json();
  },
  async triggerBackup(data: any) {
    const res = await fetch(`${API_BASE}/backups/system/trigger`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async triggerRestore(backupId: string) {
    const res = await fetch(`${API_BASE}/backups/system/${backupId}/restore`, { method: 'POST' });
    return res.json();
  },
  async listRestoreHistory() {
    const res = await fetch(`${API_BASE}/backups/system/restore-history`);
    return res.json();
  },
};
