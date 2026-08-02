import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../../components/SEOHead';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { DeveloperApiSidebar } from '../../../components/integrations/DeveloperApiSidebar';
import { getOAuthApplications } from '../../../services/oauthService';
import { OAuthApplication } from '../../../types';
import { Shield } from 'lucide-react';

export default function DeveloperOAuthPage() {
  const [apps, setApps] = useState<OAuthApplication[]>([]);

  useEffect(() => {
    getOAuthApplications().then((data) => setApps(data)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="OAuth2 Application Registration | NexoApps Developer Portal"
        description="Register OAuth2 applications, configure redirect URIs, and request user authorization scopes."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <DeveloperApiSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Shield className="w-6 h-6 text-brand-violet" /> OAuth2 Applications & Scope Management
              </h1>
              <p className="text-xs text-text-secondary">
                Build third-party integrations using OAuth2 PKCE authorization flows.
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
        </main>

        <Footer />
      </div>
    </>
  );
}
