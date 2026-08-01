import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { OrganizationSidebar } from '../../components/workspace/OrganizationSidebar';
import { ApiKeyManager } from '../../components/workspace/ApiKeyManager';
import { getWorkspaceApiKeys, createWorkspaceApiKey } from '../../services/workspaceService';
import { ProjectApiKey } from '../../types';
import { Key } from 'lucide-react';

export default function WorkspaceApiPage() {
  const [apiKeys, setApiKeys] = useState<ProjectApiKey[]>([]);

  const fetchKeys = async () => {
    try {
      const data = await getWorkspaceApiKeys('org-101');
      setApiKeys(data);
    } catch {
      setApiKeys([]);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  return (
    <>
      <SEOHead
        title="Organization API Keys & Tokens | NexoApps Workspace"
        description="Generate production API keys for SDK integration, build automation, and store publishing pipeline hooks."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <OrganizationSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Key className="w-6 h-6 text-brand-violet" /> Organization API Keys Manager
              </h1>
              <p className="text-xs text-text-secondary">
                Generate secure API tokens for CI/CD publishing pipelines, store analytics integrations, and SDK access.
              </p>
            </div>

            <ApiKeyManager
              apiKeys={apiKeys}
              onCreateKey={async (keyName) => {
                await createWorkspaceApiKey('org-101', keyName, ['read', 'upload_apks']);
                fetchKeys();
              }}
            />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
