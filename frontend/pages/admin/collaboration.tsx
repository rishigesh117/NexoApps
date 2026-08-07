import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { CollaborationDashboard } from '../../components/collaboration/CollaborationDashboard';

export default function AdminCollaborationPage() {
  return (
    <AdminLayout title="Collaboration Console | Admin">
      <div className="space-y-6">
        <CollaborationDashboard />
      </div>
    </AdminLayout>
  );
}
