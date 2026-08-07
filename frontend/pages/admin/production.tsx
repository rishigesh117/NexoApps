import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ProductionDashboard } from '../../components/production/ProductionDashboard';

export default function AdminProductionPage() {
  return (
    <AdminLayout title="Production Console | Admin">
      <div className="space-y-6">
        <ProductionDashboard />
      </div>
    </AdminLayout>
  );
}
