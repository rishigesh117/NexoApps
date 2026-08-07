import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { WorkspaceManager } from '../../components/collaboration/WorkspaceManager';

export default function AdminWorkspacesPage() {
  return (
    <AdminLayout title="Workspace Manager | Admin">
      <div className="space-y-6">
        <WorkspaceManager />
      </div>
    </AdminLayout>
  );
}
