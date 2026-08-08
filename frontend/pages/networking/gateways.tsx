import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ApiGatewayManager } from '../../components/networking/ApiGatewayManager';
import { GatewayInstanceManager } from '../../components/networking/GatewayInstanceManager';

export default function GatewaysPage() {
  return (
    <>
      <Head>
        <title>API Gateways | NexoApps</title>
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ApiGatewayManager />
          <GatewayInstanceManager />
        </div>
      </main>
      <Footer />
    </>
  );
}
