import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Sparkles } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { UniversalSidebar } from '../../components/ai-os/UniversalSidebar';
import { UnifiedWorkspace } from '../../components/ai-os/UnifiedWorkspace';
import { AICommandCenter } from '../../components/ai-os/AICommandCenter';
import { WorkspaceLauncher } from '../../components/ai-os/WorkspaceLauncher';
import { RecommendationPanel } from '../../components/ai-os/RecommendationPanel';
import { workspaceOsService } from '../../services/workspaceOsService';

export default function WorkspaceIndexPage() {
  const [workspace, setWorkspace] = useState<any>(null);

  useEffect(() => {
    fetchWs();
  }, []);

  const fetchWs = async () => {
    try {
      const res = await workspaceOsService.getActiveWorkspace();
      if (res.success) setWorkspace(res.data);
    } catch (err) {
      console.error('Failed to load workspace', err);
    }
  };

  return (
    <>
      <Head>
        <title>NexoApps AI Operating System Workspace | Version 7.0</title>
        <meta name="description" content="Unified Digital Ecosystem & AI Operating System Workspace." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <UniversalSidebar />
            <div className="flex-1 min-w-0 space-y-8">
              {workspace && <UnifiedWorkspace workspace={workspace} />}
              <AICommandCenter />
              <WorkspaceLauncher />
              <RecommendationPanel />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
