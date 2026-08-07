import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { KnowledgeBaseExplorer } from '../../components/collaboration/KnowledgeBaseExplorer';

export default function AdminKnowledgeCenterPage() {
  return (
    <AdminLayout title="Knowledge Center | Admin">
      <div className="space-y-6">
        <KnowledgeBaseExplorer />
      </div>
    </AdminLayout>
  );
}
