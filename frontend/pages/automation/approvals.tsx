import React from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ApprovalCenter } from '../../components/automation/ApprovalCenter';

export default function ApprovalsPage() {
  return (
    <>
      <SEOHead
        title="Enterprise Approval Center | NexoApps"
        description="Multi-tier workflow sign-off and approval management."
      />
      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ApprovalCenter />
        </main>
        <Footer />
      </div>
    </>
  );
}
