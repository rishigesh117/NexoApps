import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AppManagement } from '../../components/admin/AppManagement';
import { DraftManager } from '../../components/admin/pipeline/DraftManager';
import { getAppsCatalog, FEATURED_BATLYTICS_APP } from '../../services/appService';
import { adminService } from '../../services/adminService';
import { AppItem } from '../../types';

export default function AdminAppsPage() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApps = async () => {
    setIsLoading(true);
    try {
      const data = await getAppsCatalog();
      if (data && data.length > 0) {
        setApps(data);
      } else {
        setApps([FEATURED_BATLYTICS_APP]);
      }
    } catch {
      setApps([FEATURED_BATLYTICS_APP]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handlePublish = async (appId: string) => {
    try {
      await adminService.publishApp(appId);
      fetchApps();
    } catch (err: any) {
      alert(err.message || 'Publish failed');
    }
  };

  const handleArchive = async (appId: string) => {
    try {
      await adminService.archiveApp(appId);
      fetchApps();
    } catch (err: any) {
      alert(err.message || 'Archive failed');
    }
  };

  const handleDelete = async (appId: string) => {
    if (confirm('Delete this application record?')) {
      try {
        await adminService.deleteApp(appId);
        fetchApps();
      } catch (err: any) {
        alert(err.message || 'Delete failed');
      }
    }
  };

  const handleDuplicate = async (app: AppItem) => {
    try {
      const copyData = {
        ...app,
        id: `app-copy-${Date.now()}`,
        title: `${app.title} (Copy)`,
        slug: `${app.slug}-copy-${Date.now().toString().slice(-4)}`,
        packageName: `${app.packageName || 'com.nexoapps.app'}.copy`,
        isDraft: true,
      };
      await adminService.uploadApp(copyData);
      fetchApps();
    } catch (err: any) {
      alert(err.message || 'Duplicate failed');
    }
  };

  return (
    <AdminLayout title="App Catalog & Draft Manager | NexoApps Admin">
      <div className="space-y-8">
        <DraftManager
          apps={apps}
          onPublish={handlePublish}
          onArchive={handleArchive}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
        />

        <AppManagement apps={apps} onRefresh={fetchApps} />
      </div>
    </AdminLayout>
  );
}
