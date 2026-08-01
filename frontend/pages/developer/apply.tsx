import React from 'react';
import { SEOHead } from '../../components/SEOHead';
import { ApplicationWizard } from '../../components/developer/ApplicationWizard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ApplyDeveloperPage() {
  return (
    <>
      <SEOHead
        title="Apply for Developer Account | NexoApps"
        description="Register your studio and apply for a Developer account on NexoApps platform."
      />

      <div className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 font-sans">
        <div className="max-w-2xl mx-auto space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-text-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Home
          </Link>

          <ApplicationWizard />
        </div>
      </div>
    </>
  );
}
