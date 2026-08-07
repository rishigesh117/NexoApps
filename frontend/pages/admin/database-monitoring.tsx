import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DatabaseHealthDashboard } from '../../components/database-platform/DatabaseHealthDashboard';

export default function AdminDatabaseMonitoringPage() {
  return (
    <AdminLayout title="Database Health | Admin">
      <div className="space-y-6">
        <DatabaseHealthDashboard />
      </div>
    </AdminLayout>
  );
}
