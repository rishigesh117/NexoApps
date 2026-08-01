import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { MainLayout } from '../layouts/MainLayout';
import { PageHeader } from '../components/ui/PageHeader';

export default function TermsPage() {
  return (
    <>
      <SEOHead
        title="Terms & Conditions | NexoApps"
        description="Terms and Conditions governing the use of NexoApps platform and hosted software applications."
        canonicalUrl="https://nexoapps.com/terms"
      />

      <MainLayout>
        <PageHeader
          title="Terms & Conditions"
          description="Last updated: July 27, 2026. General terms governing software downloads and platform usage."
        />

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-6 text-xs sm:text-sm text-text-secondary leading-relaxed mb-16">
          <h2 className="text-xl font-bold text-white">1. Software License</h2>
          <p>Applications published on NexoApps (including Android APKs, Web Portals, and Desktop Software) are granted for personal, non-commercial use unless specified under custom terms.</p>

          <h2 className="text-xl font-bold text-white">2. Acceptable Use</h2>
          <p>Users agree not to reverse engineer, tamper with binary packages, or distribute modified builds outside of official NexoApps channels.</p>

          <h2 className="text-xl font-bold text-white">3. Disclaimer</h2>
          <p>All software hosted on NexoApps undergoes security checks; however, products are provided "as is" with continuous performance updates.</p>
        </div>
      </MainLayout>
    </>
  );
}
