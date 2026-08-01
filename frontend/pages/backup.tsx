import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BackupHistory } from '../components/cloud/BackupHistory';
import { fetchApi } from '../services/apiClient';
import { CloudBackup } from '../types';
import { ShieldCheck, Plus, RotateCcw } from 'lucide-react';

export default function BackupPage() {
  const [backups, setBackups] = useState<CloudBackup[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const fetchBackups = async () => {
    try {
      const res = await fetchApi<{ success: boolean; data: CloudBackup[] }>('/backup');
      setBackups(res.data || []);
    } catch {
      setBackups([]);
    }
  };

  const handleCreateBackup = async () => {
    setIsCreating(true);
    try {
      await fetchApi('/backup/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ backupName: 'Manual Cloud Snapshot' }),
      });
      fetchBackups();
    } catch {
      alert('Failed to create backup snapshot.');
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  return (
    <>
      <SEOHead
        title="Backup & Restore Center | NexoApps"
        description="Create encrypted cloud state snapshots and restore user preferences, custom playlists, and download logs."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-brand-cyan" /> Cloud Backup & Restore Center
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary mt-1">
                Create AES-256 encrypted account backups and restore your account state instantly.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCreateBackup}
              disabled={isCreating}
              className="px-6 py-3 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet hover:shadow-glow-cyan flex items-center gap-2 transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{isCreating ? 'Creating Backup...' : 'Create Backup Snapshot'}</span>
            </button>
          </div>

          <BackupHistory
            backups={backups}
            onRestore={async (id) => {
              await fetchApi('/backup/restore', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ backupId: id }),
              });
              alert('Cloud backup successfully restored!');
            }}
          />
        </main>

        <Footer />
      </div>
    </>
  );
}
