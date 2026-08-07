import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { IntegrationHub } from '../../components/automation/IntegrationHub';

export default function AdminIntegrationCenterPage() {
  return (
    <AdminLayout title="Enterprise Integration Hub | Admin Console">
      <div className="space-y-8 text-left">
        <IntegrationHub />
      </div>
    </AdminLayout>
  );
}
