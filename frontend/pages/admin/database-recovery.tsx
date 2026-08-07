import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { RestoreCenter } from '../../components/database-platform/RestoreCenter';

export default function AdminDatabaseRecoveryPage() {
  return (
    <AdminLayout title="Restore Center | Admin">
      <div className="space-y-6">
        <RestoreCenter />
      </div>
    </AdminLayout>
  );
}
