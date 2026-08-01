import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PreferencesSync } from '../components/cloud/PreferencesSync';
import { fetchApi } from '../services/apiClient';
import { UserPreference } from '../types';
import { Sliders } from 'lucide-react';

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState<UserPreference>({
    userId: 'usr-1',
    theme: 'dark',
    language: 'en',
    emailNotifications: true,
    pushNotifications: true,
    autoBackup: true,
    syncFavorites: true,
    syncCollections: true,
    updatedAt: new Date().toISOString(),
  });

  const fetchPrefs = async () => {
    try {
      const res = await fetchApi<{ success: boolean; data: UserPreference }>('/preferences');
      if (res.data) setPreferences(res.data);
    } catch {
      // Keep default
    }
  };

  useEffect(() => {
    fetchPrefs();
  }, []);

  return (
    <>
      <SEOHead
        title="Sync Preferences & Custom Settings | NexoApps"
        description="Configure synchronization rules, notification preferences, and automatic backup settings."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <Sliders className="w-6 h-6 text-brand-cyan" /> Cloud Synchronization Preferences
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary">
              Customize which data types synchronize automatically across mobile and desktop devices.
            </p>
          </div>

          <PreferencesSync
            preferences={preferences}
            onSave={async (patch) => {
              await fetchApi('/preferences', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(patch),
              });
            }}
          />
        </main>

        <Footer />
      </div>
    </>
  );
}
