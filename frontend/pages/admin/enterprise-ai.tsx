import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { EnterpriseAIHub } from '../../components/enterprise/EnterpriseAIHub';

export default function AdminEnterpriseAIPage() {
  return (
    <AdminLayout title="Enterprise AI Services | Admin">
      <div className="space-y-6">
        <EnterpriseAIHub />
      </div>
    </AdminLayout>
  );
}
