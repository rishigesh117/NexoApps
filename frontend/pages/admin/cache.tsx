import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { CacheManager } from '../../components/production/CacheManager';

export default function AdminCachePage() {
  return (
    <AdminLayout title="Cache Manager | Admin">
      <div className="space-y-6">
        <CacheManager />
      </div>
    </AdminLayout>
  );
}
