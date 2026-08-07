import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { EnterpriseMonitoringCenter } from '../../components/enterprise/EnterpriseMonitoringCenter';

export default function AdminEnterpriseMonitoringPage() {
  return (
    <AdminLayout title="Monitoring Center | Admin">
      <div className="space-y-6">
        <EnterpriseMonitoringCenter />
      </div>
    </AdminLayout>
  );
}
