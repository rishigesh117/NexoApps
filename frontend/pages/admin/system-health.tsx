import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { HealthCenter } from '../../components/production/HealthCenter';

export default function AdminSystemHealthPage() {
  return (
    <AdminLayout title="System Health | Admin">
      <div className="space-y-6">
        <HealthCenter />
      </div>
    </AdminLayout>
  );
}
