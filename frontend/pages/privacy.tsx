import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { MainLayout } from '../layouts/MainLayout';
import { PageHeader } from '../components/ui/PageHeader';

export default function PrivacyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy | NexoApps"
        description="NexoApps Privacy Policy detailing user data protection, local storage usage, and security standards."
        canonicalUrl="https://nexoapps.com/privacy"
      />

      <MainLayout>
        <PageHeader
          title="Privacy Policy"
          description="Last updated: July 27, 2026. Your privacy and data security are core pillars of NexoApps."
        />

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-6 text-xs sm:text-sm text-text-secondary leading-relaxed mb-16">
          <h2 className="text-xl font-bold text-white">1. Information We Collect</h2>
          <p>NexoApps operates on minimal data collection principles. Download metrics and anonymous telemetry are logged solely for performance optimization and application health tracking.</p>

          <h2 className="text-xl font-bold text-white">2. Application Storage</h2>
          <p>Applications such as Batlytics store scoring data locally on your device. Local data remains on your hardware with optional cloud sync when enabled.</p>

          <h2 className="text-xl font-bold text-white">3. Contact & Feedback</h2>
          <p>Messages submitted through the suggestion form are processed exclusively by the platform owner to respond to inquiries.</p>
        </div>
      </MainLayout>
    </>
  );
}
