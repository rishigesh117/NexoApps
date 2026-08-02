import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { DepartmentManager } from '../../components/enterprise/DepartmentManager';

export default function DepartmentsPage() {
  return (
    <>
      <Head>
        <title>Enterprise Departments | NexoApps AI Enterprise</title>
        <meta name="description" content="Digital enterprise department structure and budget allocations." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Digital Enterprise Departments</h1>
            <p className="text-text-secondary mt-1">Manage departmental hierarchies, budget allocations, and department lead assignments</p>
          </motion.div>

          <DepartmentManager />
        </div>
      </main>
    </>
  );
}
