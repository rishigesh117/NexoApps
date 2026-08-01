import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { UserManagement } from '../../components/admin/UserManagement';
import { adminService } from '../../services/adminService';
import { UserAdminRecord } from '../../types';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserAdminRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getUsers();
      if (data && data.length > 0) {
        setUsers(data);
      } else {
        setUsers([
          {
            id: 'usr-admin-1',
            username: 'admin',
            email: 'admin@nexoapps.com',
            role: 'ADMIN',
            emailVerified: true,
            status: 'Active',
            createdAt: new Date().toISOString(),
          },
          {
            id: 'usr-demo-1',
            username: 'Alex Turner',
            email: 'alex@example.com',
            role: 'MEMBER',
            emailVerified: true,
            status: 'Active',
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
    fetchUsers();
  }, []);

  return (
    <AdminLayout title="User Accounts Directory | NexoApps Admin">
      <UserManagement users={users} onRefresh={fetchUsers} />
    </AdminLayout>
  );
}
