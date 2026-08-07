import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { StorageExplorer } from '../../components/production/StorageExplorer';

export default function AdminStoragePage() {
  return (
    <AdminLayout title="Storage Manager | Admin">
      <div className="space-y-6">
        <StorageExplorer />
      </div>
    </AdminLayout>
  );
}
