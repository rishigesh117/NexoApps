import React from 'react';
import Link from 'next/link';

export const AutomationDashboard: React.FC = () => {
  const stats = [
    { title: 'Active Workspaces', value: '12', change: '+2 this month', color: 'from-blue-500 to-indigo-600' },
    { title: 'Total Workflows', value: '84', change: '99.4% uptime', color: 'from-purple-500 to-pink-600' },
    { title: '30-Day Executions', value: '148,200', change: '+18.5% YoY', color: 'from-emerald-500 to-teal-600' },
    { title: 'Active RPA Bots', value: '24', change: '88.2% utilization', color: 'from-amber-500 to-orange-600' },
    { title: 'Time Saved (Hours)', value: '14,250', change: '$712.5K cost saved', color: 'from-cyan-500 to-blue-600' },
  ];

  return (
    <div className="space-y-8 p-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
            AI Enterprise Automation Platform
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Intelligent Business Process Orchestration &amp; Autonomous Workflow Engine (v8.3)
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/automation/designer"
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold rounded-xl transition duration-200 shadow-lg shadow-indigo-500/25"
          >
            + Create Workflow
          </Link>
          <Link
            href="/automation/analytics"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl border border-slate-700 transition duration-200"
          >
            Analytics Console
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg group hover:border-slate-700 transition-all duration-300"
          >
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.title}</span>
            <div className="text-3xl font-bold mt-2 text-white">{stat.value}</div>
            <div className="text-xs text-emerald-400 font-medium mt-2">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 transition duration-300">
          <h3 className="text-lg font-bold text-white mb-2">⚡ Workflow Engine</h3>
          <p className="text-slate-400 text-sm mb-4">
            Design, deploy, and monitor complex multi-step automated workflows with visual canvas &amp; AI logic.
          </p>
          <Link href="/automation/workflows" className="text-indigo-400 text-sm font-semibold hover:underline">
            Manage Workflows &rarr;
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 transition duration-300">
          <h3 className="text-lg font-bold text-white mb-2">🤖 RPA Bot Center</h3>
          <p className="text-slate-400 text-sm mb-4">
            Deploy unattended and attended robotic process automation bots for UI automation and legacy integration.
          </p>
          <Link href="/automation/rpa" className="text-purple-400 text-sm font-semibold hover:underline">
            Open RPA Manager &rarr;
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/50 transition duration-300">
          <h3 className="text-lg font-bold text-white mb-2">🔌 Integration Hub</h3>
          <p className="text-slate-400 text-sm mb-4">
            Connect to SAP, Salesforce, ServiceNow, Slack, and cloud APIs with zero-code enterprise connectors.
          </p>
          <Link href="/automation/integrations" className="text-teal-400 text-sm font-semibold hover:underline">
            Browse Connectors &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
