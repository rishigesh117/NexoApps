import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { EnterpriseHealthDashboard } from '../../components/enterprise/EnterpriseHealthDashboard';

export default function AdminEnterpriseHealthPage() {
  return (
    <AdminLayout title="Enterprise Health | Admin">
      <div className="space-y-6">
        <EnterpriseHealthDashboard />
      </div>
    </AdminLayout>
  );
}
