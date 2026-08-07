import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { RPABotManager } from '../../components/automation/RPABotManager';

export default function AdminRPACenterPage() {
  return (
    <AdminLayout title="RPA Bot Orchestration Center | Admin Console">
      <div className="space-y-8 text-left">
        <RPABotManager />
      </div>
    </AdminLayout>
  );
}
