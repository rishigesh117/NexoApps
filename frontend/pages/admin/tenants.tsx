import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { TenantCard } from '../../components/saas/TenantCard';
import { getTenants } from '../../services/tenantService';
import { Tenant } from '../../types';
import { Building2 } from 'lucide-react';

export default function AdminTenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    getTenants().then((data) => setTenants(data)).catch(() => {});
  }, []);

  return (
    <AdminLayout title="Admin Tenants Management | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-brand-cyan" /> Enterprise SaaS Tenant Management
          </h1>
          <p className="text-xs text-text-secondary">
            Inspect active tenant organizations, member seat quotas, and plan tiers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tenants.map((t) => (
            <TenantCard key={t.id} tenant={t} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
