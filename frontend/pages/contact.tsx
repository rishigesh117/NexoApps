import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { MainLayout } from '../layouts/MainLayout';
import { PageHeader } from '../components/ui/PageHeader';
import { ContactTeaser } from '../components/ContactTeaser';

export default function ContactPage() {
  return (
    <>
      <SEOHead
        title="Contact & Feedback | NexoApps Platform"
        description="Get in touch with the NexoApps platform owner. Send suggestions, bug reports, or feature requests."
        canonicalUrl="https://nexoapps.com/contact"
      />

      <MainLayout>
        <PageHeader
          title="Contact & Suggestions"
          description="Have questions or feature suggestions for Batlytics or upcoming apps? Send a direct message."
        />

        <div className="pb-16">
          <ContactTeaser />
        </div>
      </MainLayout>
    </>
  );
}
