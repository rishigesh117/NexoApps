import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { getOrganizationBySlug } from '../../services/organizationService';
import { Organization } from '../../types';
import { Building2, CheckCircle2, Globe, MapPin, Users, FolderGit2 } from 'lucide-react';

export default function OrganizationPublicProfilePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [org, setOrg] = useState<Organization | null>(null);

  useEffect(() => {
    if (slug) {
      getOrganizationBySlug(slug as string).then((data) => setOrg(data));
    }
  }, [slug]);

  if (!org) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto p-12 text-center">
          <p className="text-sm font-bold text-text-muted">Loading Organization Profile...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${org.name} (@${org.slug}) | NexoApps Organization`}
        description={org.description || 'Public organization profile on NexoApps platform.'}
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
          {/* Header Banner */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-white/20 flex items-center justify-center text-4xl shrink-0">
                {org.logoUrl || '🏢'}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">{org.name}</h1>
                  {org.isVerified && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Studio Org
                    </span>
                  )}
                </div>
                <span className="text-xs text-brand-cyan font-mono font-semibold">@{org.slug}</span>
                <p className="text-xs text-text-secondary leading-relaxed max-w-2xl">{org.description}</p>

                <div className="flex items-center gap-4 text-xs text-text-muted pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-cyan" /> {org.country}
                  </span>
                  {org.websiteUrl && (
                    <a href={org.websiteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                      <Globe className="w-3.5 h-3.5 text-brand-violet" /> {org.websiteUrl}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="glass-panel p-4 rounded-2xl border border-white/10">
              <span className="text-[10px] text-text-muted font-bold uppercase">Members</span>
              <p className="text-xl font-black text-white">{org.membersCount || 5}</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-white/10">
              <span className="text-[10px] text-text-muted font-bold uppercase">Projects</span>
              <p className="text-xl font-black text-white">{org.projectsCount || 3}</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-white/10">
              <span className="text-[10px] text-text-muted font-bold uppercase">Total Downloads</span>
              <p className="text-xl font-black text-emerald-400">142,500</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-white/10">
              <span className="text-[10px] text-text-muted font-bold uppercase">Average Rating</span>
              <p className="text-xl font-black text-amber-400">4.9 ★</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
