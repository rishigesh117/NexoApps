import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { CapacityPlanner } from '../../components/database-platform/CapacityPlanner';

export default function AdminDatabaseCapacityPage() {
  return (
    <AdminLayout title="Capacity Planner | Admin">
      <div className="space-y-6">
        <CapacityPlanner />
      </div>
    </AdminLayout>
  );
}
