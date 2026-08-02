import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getOAuthApplications } from '../../services/oauthService';
import { OAuthApplication } from '../../types';
import { Shield } from 'lucide-react';

export default function AdminOAuthPage() {
  const [apps, setApps] = useState<OAuthApplication[]>([]);

  useEffect(() => {
    getOAuthApplications().then((data) => setApps(data)).catch(() => {});
  }, []);

  return (
    <AdminLayout title="Admin OAuth Applications Console | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-brand-violet" /> Global OAuth2 Applications Console
          </h1>
          <p className="text-xs text-text-secondary">
            Inspect all registered third-party OAuth2 developer client applications and authorization tokens.
          </p>
        </div>

        <div className="space-y-4">
          {apps.map((app) => (
            <div key={app.id} className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2 shadow-2xl">
              <h4 className="font-extrabold text-white text-base">{app.name}</h4>
              <p className="text-xs font-mono text-text-muted">Client ID: {app.clientId}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
