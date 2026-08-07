import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DatabasePlatformDashboard } from '../../components/database-platform/DatabasePlatformDashboard';

export default function AdminDatabasePlatformPage() {
  return (
    <AdminLayout title="Database Console | Admin">
      <div className="space-y-6">
        <DatabasePlatformDashboard />
      </div>
    </AdminLayout>
  );
}
