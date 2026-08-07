import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { QueueManager } from '../../components/production/QueueManager';

export default function AdminMessageQueuesPage() {
  return (
    <AdminLayout title="Queue Manager | Admin">
      <div className="space-y-6">
        <QueueManager />
      </div>
    </AdminLayout>
  );
}
