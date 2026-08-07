import React, { useState } from 'react';
import Head from 'next/head';
import { BookOpen } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { PromptLibrary } from '../../components/ai-gateway/PromptLibrary';
import { PromptEditor } from '../../components/ai-gateway/PromptEditor';
import { PromptTemplate } from '../../../shared/types';

export default function AdminPromptsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | undefined>(undefined);

  return (
    <>
      <Head>
        <title>Prompt Library Admin | NexoApps Admin</title>
        <meta name="description" content="Enterprise prompt library governance and version control." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <AdminSidebar />
            <div className="flex-1 min-w-0 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-brand-cyan" />
                    Prompt Library & Governance Admin
                  </h1>
                  <p className="text-xs text-text-secondary">System prompt audits and version commit history</p>
                </div>
              </div>

              <PromptLibrary onSelectPrompt={(t) => setSelectedTemplate(t)} />
              <PromptEditor template={selectedTemplate} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
