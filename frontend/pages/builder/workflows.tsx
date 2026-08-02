import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { BuilderSidebar } from '../../components/builder/BuilderSidebar';
import { getAIWorkflows, createAIWorkflow } from '../../services/workflowService';
import { AIWorkflow } from '../../types';
import { Zap, Plus } from 'lucide-react';

export default function BuilderWorkflowsPage() {
  const [workflows, setWorkflows] = useState<AIWorkflow[]>([]);
  const [name, setName] = useState('');
  const [triggerType, setTriggerType] = useState('OnUpload');

  const fetchWfs = async () => {
    try {
      const data = await getAIWorkflows();
      setWorkflows(data);
    } catch {
      setWorkflows([]);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await createAIWorkflow(name, triggerType, ['Auto Verification', 'Slack Alert']);
      setName('');
      fetchWfs();
    } catch {
      alert('Failed to create workflow.');
    }
  };

  useEffect(() => {
    fetchWfs();
  }, []);

  return (
    <>
      <SEOHead
        title="Low-Code Automation Workflows | NexoApps AI Builder"
        description="Automate build verification, security scanning, backup schedules, and store notification hooks."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <BuilderSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Zap className="w-6 h-6 text-amber-400" /> Low-Code Automation Workflow Designer
              </h1>
              <p className="text-xs text-text-secondary">
                Configure event-driven automation rules triggered by build uploads, cron jobs, or API webhooks.
              </p>
            </div>

            <form onSubmit={handleCreate} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Workflow Rule Name..."
                className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              />
              <select
                value={triggerType}
                onChange={(e) => setTriggerType(e.target.value)}
                className="px-4 py-2.5 rounded-full bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              >
                <option value="OnUpload">Trigger: On Build Upload</option>
                <option value="Cron">Trigger: Cron Schedule</option>
                <option value="Webhook">Trigger: API Webhook</option>
              </select>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1.5 transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Rule</span>
              </button>
            </form>

            <div className="space-y-4">
              {workflows.map((w) => (
                <div key={w.id} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center justify-between gap-4 shadow-2xl">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <h4 className="font-extrabold text-white text-sm">{w.name}</h4>
                    </div>
                    <p className="text-xs text-text-muted">
                      Trigger: <span className="font-mono text-brand-cyan">{w.triggerType}</span> • Actions: {w.actions.join(' → ')}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
