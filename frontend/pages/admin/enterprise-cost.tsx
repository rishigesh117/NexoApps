import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { EnterpriseCostDashboard } from '../../components/enterprise/EnterpriseCostDashboard';

export default function AdminEnterpriseCostPage() {
  return (
    <AdminLayout title="Cost Management | Admin">
      <div className="space-y-6">
        <EnterpriseCostDashboard />
      </div>
    </AdminLayout>
  );
}
