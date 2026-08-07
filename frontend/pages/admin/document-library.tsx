import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DocumentWorkspace } from '../../components/collaboration/DocumentWorkspace';

export default function AdminDocumentLibraryPage() {
  return (
    <AdminLayout title="Document Library | Admin">
      <div className="space-y-6">
        <DocumentWorkspace />
      </div>
    </AdminLayout>
  );
}
