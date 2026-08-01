import React, { useState } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { OrganizationSidebar } from '../../components/workspace/OrganizationSidebar';
import { Settings, Building2, Save } from 'lucide-react';

export default function WorkspaceSettingsPage() {
  const [name, setName] = useState('Batlytics Studio Org');
  const [description, setDescription] = useState('Enterprise organization building high-precision cricket scoring and sports performance engines.');
  const [websiteUrl, setWebsiteUrl] = useState('https://batlytics.com');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <SEOHead
        title="Organization Settings | NexoApps Workspace"
        description="Configure organization profile name, website, country, branding assets, and security preferences."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <OrganizationSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Settings className="w-6 h-6 text-brand-cyan" /> Organization Settings & Branding
              </h1>
              <p className="text-xs text-text-secondary">
                Configure your public organization profile, custom branding logo, and member permission defaults.
              </p>
            </div>

            <form onSubmit={handleSave} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 shadow-2xl">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white">Organization Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-white">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-white">Website URL</label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-8 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet hover:shadow-glow-cyan flex items-center gap-2 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{saved ? 'Settings Saved!' : 'Save Organization Settings'}</span>
              </button>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
