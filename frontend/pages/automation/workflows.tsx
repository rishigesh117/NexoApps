import React from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { WorkflowTemplateLibrary } from '../../components/automation/WorkflowTemplateLibrary';
import { ExecutionMonitor } from '../../components/automation/ExecutionMonitor';

export default function WorkflowsPage() {
  return (
    <>
      <SEOHead
        title="Enterprise Workflows | NexoApps"
        description="Autonomous workflow orchestration and execution monitor."
      />
      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <WorkflowTemplateLibrary />
          <ExecutionMonitor />
        </main>
        <Footer />
      </div>
    </>
  );
}
