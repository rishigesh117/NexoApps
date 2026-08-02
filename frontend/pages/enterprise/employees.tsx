import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { DigitalEmployeeGrid } from '../../components/enterprise/DigitalEmployeeGrid';

export default function EmployeesPage() {
  return (
    <>
      <Head>
        <title>Digital Workforce | NexoApps AI Enterprise</title>
        <meta name="description" content="AI employee roster, roles, and autonomy settings." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Digital AI Workforce Roster</h1>
            <p className="text-text-secondary mt-1">Deploy, configure, and monitor digital AI employees, model selection, and autonomy levels</p>
          </motion.div>

          <DigitalEmployeeGrid />
        </div>
      </main>
    </>
  );
}
