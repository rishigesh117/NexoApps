import React from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { IntegrationHub } from '../../components/automation/IntegrationHub';

export default function IntegrationsPage() {
  return (
    <>
      <SEOHead
        title="Integration Hub | NexoApps"
        description="Enterprise connectors for SAP, Salesforce, ServiceNow, and Slack."
      />
      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <IntegrationHub />
        </main>
        <Footer />
      </div>
    </>
  );
}
