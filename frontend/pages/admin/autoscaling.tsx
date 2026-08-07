import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AutoscalingManager } from '../../components/production/AutoscalingManager';

export default function AdminAutoscalingPage() {
  return (
    <AdminLayout title="Autoscaling | Admin">
      <div className="space-y-6">
        <AutoscalingManager />
      </div>
    </AdminLayout>
  );
}
