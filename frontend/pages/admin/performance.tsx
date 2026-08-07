import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { PerformanceDashboard } from '../../components/production/PerformanceDashboard';

export default function AdminPerformancePage() {
  return (
    <AdminLayout title="Performance Center | Admin">
      <div className="space-y-6">
        <PerformanceDashboard />
      </div>
    </AdminLayout>
  );
}
