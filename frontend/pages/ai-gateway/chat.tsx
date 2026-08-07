import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { ChatWorkspace } from '../../components/ai-gateway/ChatWorkspace';

export default function AIChatWorkspacePage() {
  return (
    <>
      <Head>
        <title>Universal Chat Workspace | NexoApps Version 6.0</title>
        <meta name="description" content="Interactive multi-model chat workspace powered by NexoApps Version 6.0 AI Gateway." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <ChatWorkspace />
        </div>
      </main>
    </>
  );
}
