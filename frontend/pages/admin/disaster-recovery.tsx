import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DisasterRecoveryCenter } from '../../components/database-platform/DisasterRecoveryCenter';

export default function AdminDisasterRecoveryPage() {
  return (
    <AdminLayout title="Disaster Recovery | Admin">
      <div className="space-y-6">
        <DisasterRecoveryCenter />
      </div>
    </AdminLayout>
  );
}
