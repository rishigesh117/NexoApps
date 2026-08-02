import React, { useState } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { TenantSidebar } from '../../components/saas/TenantSidebar';
import { Palette, Upload } from 'lucide-react';

export default function TenantBrandingPage() {
  const [primaryColor, setPrimaryColor] = useState('#06b6d4');
  const [accentColor, setAccentColor] = useState('#8b5cf6');

  return (
    <>
      <SEOHead
        title="White-Label Branding Customizer | NexoApps SaaS Console"
        description="Customize tenant logos, primary colors, support emails, and white-label theme stylesheets."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <TenantSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Palette className="w-6 h-6 text-brand-violet" /> White-Label Branding Customizer
              </h1>
              <p className="text-xs text-text-secondary">
                Upload custom organization logos, set primary theme brand colors, and configure white-label headers.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white">Brand Primary Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                  />
                  <span className="font-mono text-xs text-brand-cyan">{primaryColor}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-white">Brand Accent Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                  />
                  <span className="font-mono text-xs text-brand-violet">{accentColor}</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
