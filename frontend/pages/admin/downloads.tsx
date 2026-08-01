import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { RecentDownloads } from '../../components/admin/RecentDownloads';
import { adminService } from '../../services/adminService';

export default function AdminDownloadsPage() {
  const [downloads, setDownloads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminService.getDownloads().then((data) => {
      setDownloads(data || []);
      setIsLoading(false);
    });
  }, []);

  return (
    <AdminLayout title="Download Logs & Traffic | NexoApps Admin">
      <div className="space-y-6 text-left">
        <RecentDownloads downloads={downloads} />
      </div>
    </AdminLayout>
  );
}
