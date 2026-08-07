import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ClusterManager } from '../../components/database-platform/ClusterManager';

export default function AdminDatabaseClustersPage() {
  return (
    <AdminLayout title="Cluster Manager | Admin">
      <div className="space-y-6">
        <ClusterManager />
      </div>
    </AdminLayout>
  );
}
