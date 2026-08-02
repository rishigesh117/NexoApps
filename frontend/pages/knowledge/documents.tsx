import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { DocumentViewer } from '../../components/knowledge/DocumentViewer';
import { KnowledgeUploader } from '../../components/knowledge/KnowledgeUploader';

export default function KnowledgeDocumentsPage() {
  return (
    <>
      <Head>
        <title>Knowledge Documents | NexoApps Knowledge Cloud</title>
        <meta name="description" content="Indexed documents, chunking, and upload processing." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-display font-bold">Knowledge Document Repository</h1>
            <p className="text-text-secondary mt-1">Upload and inspect parsed PDF, DOCX, and Markdown documents</p>
          </motion.div>

          <KnowledgeUploader />
          <DocumentViewer />
        </div>
      </main>
    </>
  );
}
