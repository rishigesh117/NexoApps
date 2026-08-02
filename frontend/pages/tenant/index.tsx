import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { TenantSidebar } from '../../components/saas/TenantSidebar';
import { TenantCard } from '../../components/saas/TenantCard';
import { getTenants, createTenant } from '../../services/tenantService';
import { Tenant } from '../../types';
import { Building2, Plus, Users, ShieldCheck } from 'lucide-react';

export default function TenantDashboardPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [name, setName] = useState('');

  const fetchTenants = async () => {
    try {
      const data = await getTenants();
      setTenants(data);
    } catch {
      setTenants([]);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await createTenant({ name, planTier: 'PROFESSIONAL' });
      setName('');
      fetchTenants();
    } catch {
      alert('Failed to create organization.');
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  return (
    <>
      <SEOHead
        title="Enterprise Multi-Tenant SaaS Console | NexoApps"
        description="Tenant isolation, organization management, team roles, white-label hosting, and custom domain CNAME."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <TenantSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <Building2 className="w-6 h-6 text-brand-cyan" /> Enterprise SaaS Multi-Tenant Ecosystem (v3.0)
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary">
                Manage organization tenants, member permissions, custom domains, and white-label branding.
              </p>
            </div>

            <form onSubmit={handleCreate} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="New Organization Name (e.g. Batlytics Enterprise)..."
                className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1.5 transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Create Tenant</span>
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tenants.map((t) => (
                <TenantCard key={t.id} tenant={t} />
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
