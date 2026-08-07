import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { BackupCenter } from '../../components/database-platform/BackupCenter';

export default function AdminDatabaseBackupsPage() {
  return (
    <AdminLayout title="Backup Center | Admin">
      <div className="space-y-6">
        <BackupCenter />
      </div>
    </AdminLayout>
  );
}
