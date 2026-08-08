import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { NetworkingDashboard } from '../../components/networking/NetworkingDashboard';

export default function NetworkingPage() {
  return (
    <>
      <Head>
        <title>Enterprise Networking & Global Edge Platform | NexoApps</title>
        <meta name="description" content="API Gateway, global edge POP locations, reverse proxy routing, load balancing, DNS management, WAF & network security for NexoApps." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-white tracking-tight">
                Enterprise Networking & Global Edge Infrastructure
              </h1>
              <p className="text-sm text-text-muted mt-1">
                Version 9.4 API Gateway, Reverse Proxy, Load Balancing, Global Routing & WAF Security Layer
              </p>
            </div>
          </div>
          <NetworkingDashboard />
        </div>
      </main>
      <Footer />
    </>
  );
}
