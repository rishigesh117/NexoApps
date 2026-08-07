import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { CollaborationAnalytics } from '../../components/collaboration/CollaborationAnalytics';

export default function AdminCollaborationAnalyticsPage() {
  return (
    <AdminLayout title="Collaboration Analytics | Admin">
      <div className="space-y-6">
        <CollaborationAnalytics />
      </div>
    </AdminLayout>
  );
}
