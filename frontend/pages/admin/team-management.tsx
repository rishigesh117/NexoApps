import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { TeamChannelPanel } from '../../components/collaboration/TeamChannelPanel';

export default function AdminTeamManagementPage() {
  return (
    <AdminLayout title="Team Management | Admin">
      <div className="space-y-6">
        <TeamChannelPanel />
      </div>
    </AdminLayout>
  );
}
