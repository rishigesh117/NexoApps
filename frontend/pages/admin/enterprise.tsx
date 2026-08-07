import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { EnterpriseDashboard } from '../../components/enterprise/EnterpriseDashboard';

export default function AdminEnterprisePage() {
  return (
    <AdminLayout title="Enterprise Console | Admin">
      <div className="space-y-6">
        <EnterpriseDashboard />
      </div>
    </AdminLayout>
  );
}
