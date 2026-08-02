import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getIntegrationProviders } from '../../services/integrationService';
import { IntegrationProvider } from '../../types';
import { Globe } from 'lucide-react';

export default function AdminIntegrationsPage() {
  const [providers, setProviders] = useState<IntegrationProvider[]>([]);

  useEffect(() => {
    getIntegrationProviders().then((res) => setProviders(res.providers)).catch(() => {});
  }, []);

  return (
    <AdminLayout title="Admin Enterprise Integrations Console | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Globe className="w-6 h-6 text-emerald-400" /> Enterprise Integration Providers Management
          </h1>
          <p className="text-xs text-text-secondary">
            Manage global integration providers, OAuth2 client secrets, and security permissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {providers.map((p) => (
            <div key={p.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2 shadow-2xl">
              <h4 className="font-extrabold text-white text-base">{p.name}</h4>
              <p className="text-xs text-text-muted">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
