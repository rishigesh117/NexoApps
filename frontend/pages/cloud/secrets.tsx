import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { SecretVault } from '../../components/cloud/SecretVault';

export default function CloudSecretsPage() {
  return (
    <>
      <Head>
        <title>Secrets Vault | NexoApps AI Cloud</title>
        <meta name="description" content="Encrypted secret store, API credentials, and key rotation manager." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Encrypted Secrets Vault</h1>
            <p className="text-text-secondary mt-1">Manage API keys, tokens, credentials, and security key rotation</p>
          </motion.div>

          <SecretVault />
        </div>
      </main>
    </>
  );
}
