import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Building2, Bot, Layers, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { DigitalEmployeeGrid } from '../../components/enterprise/DigitalEmployeeGrid';
import { DepartmentManager } from '../../components/enterprise/DepartmentManager';
import { BusinessProcessDesigner } from '../../components/enterprise/BusinessProcessDesigner';
import { ApprovalQueue } from '../../components/enterprise/ApprovalQueue';
import { DecisionTimeline } from '../../components/enterprise/DecisionTimeline';
import { AutomationCenter } from '../../components/enterprise/AutomationCenter';
import { OrganizationDashboard } from '../../components/enterprise/OrganizationDashboard';
import { EnterpriseMetricsPanel } from '../../components/enterprise/EnterpriseMetricsPanel';

export default function AutonomousEnterpriseHubPage() {
  return (
    <>
      <Head>
        <title>Autonomous AI Enterprise | NexoApps Version 5.3</title>
        <meta name="description" content="Autonomous AI Enterprise Hub. Digital workforce, business processes, approval workflows, and decision intelligence." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-brand-cyan/20 via-brand-blue/20 to-brand-violet/20 border border-brand-cyan/30">
              <Building2 className="w-4 h-4 text-brand-cyan" />
              <span className="text-xs font-black tracking-wider uppercase text-white">Autonomous AI Enterprise • Version 5.3</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight">
              Digital Workforce & <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet bg-clip-text text-transparent">Process Automation</span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto">
              Orchestrate digital AI employees, enterprise departments, automated approval chains, and decision intelligence.
            </p>
          </motion.div>

          <OrganizationDashboard />
          <DigitalEmployeeGrid />
          <DepartmentManager />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BusinessProcessDesigner />
            <ApprovalQueue />
          </div>
          <DecisionTimeline />
          <AutomationCenter />
          <EnterpriseMetricsPanel />

        </div>
      </main>
    </>
  );
}
