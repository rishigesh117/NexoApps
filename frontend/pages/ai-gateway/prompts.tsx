import React, { useState } from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { PromptLibrary } from '../../components/ai-gateway/PromptLibrary';
import { PromptEditor } from '../../components/ai-gateway/PromptEditor';
import { PromptTemplate } from '../../../shared/types';

export default function AIPromptsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | undefined>(undefined);

  return (
    <>
      <Head>
        <title>Enterprise Prompt Library & Governance | NexoApps Version 6.0</title>
        <meta name="description" content="Manage system prompts, variables, and version control in NexoApps Version 6.0." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <PromptLibrary onSelectPrompt={(t) => setSelectedTemplate(t)} />
          <PromptEditor template={selectedTemplate} />
        </div>
      </main>
    </>
  );
}
