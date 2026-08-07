import React from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { WorkflowDesigner } from '../../components/automation/WorkflowDesigner';

export default function DesignerPage() {
  return (
    <>
      <SEOHead
        title="Visual Workflow Designer | NexoApps"
        description="Drag-and-drop autonomous workflow designer canvas."
      />
      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 w-full">
          <WorkflowDesigner />
        </main>
      </div>
    </>
  );
}
