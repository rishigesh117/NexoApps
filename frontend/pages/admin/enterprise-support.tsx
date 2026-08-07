import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { EnterpriseSupportCenter } from '../../components/enterprise/EnterpriseSupportCenter';

export default function AdminEnterpriseSupportPage() {
  return (
    <AdminLayout title="Enterprise Support | Admin">
      <div className="space-y-6">
        <EnterpriseSupportCenter />
      </div>
    </AdminLayout>
  );
}
