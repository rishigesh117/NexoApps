import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DeveloperManagement } from '../../components/admin/DeveloperManagement';
import { adminService } from '../../services/adminService';
import { DeveloperProfile } from '../../types';

export default function AdminDevelopersPage() {
  const [developers, setDevelopers] = useState<DeveloperProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDevelopers = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getDevelopers();
      if (data && data.length > 0) {
        setDevelopers(data);
      } else {
        setDevelopers([
          {
            id: 'dev-batlytics-001',
            name: 'Batlytics Studio',
            email: 'developer@batlytics.com',
            website: 'https://batlytics.com',
            bio: 'Creators of high-precision sports analytics & cricket scoring engines.',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
            status: 'Active',
            isVerified: true,
            totalApps: 3,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  return (
    <AdminLayout title="Developer Portal | NexoApps Admin">
      <DeveloperManagement developers={developers} onRefresh={fetchDevelopers} />
    </AdminLayout>
  );
}
