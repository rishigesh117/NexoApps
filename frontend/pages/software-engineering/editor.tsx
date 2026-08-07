import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { CodeEditor } from '../../components/software-engineering/CodeEditor';
import { CodeGenerationPanel } from '../../components/software-engineering/CodeGenerationPanel';

export default function SoftwareEditorPage() {
  return (
    <>
      <Head>
        <title>Intelligent Code Studio & Synthesizer | NexoApps</title>
        <meta name="description" content="AI Code Synthesizer and in-browser code editor." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <CodeEditor />
          <CodeGenerationPanel />
        </div>
      </main>
    </>
  );
}
