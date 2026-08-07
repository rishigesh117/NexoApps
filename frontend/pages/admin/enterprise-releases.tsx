import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { EnterpriseReleaseCenter } from '../../components/enterprise/EnterpriseReleaseCenter';

export default function AdminEnterpriseReleasesPage() {
  return (
    <AdminLayout title="Release Center | Admin">
      <div className="space-y-6">
        <EnterpriseReleaseCenter />
      </div>
    </AdminLayout>
  );
}
