import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AgentSidebar } from '../../components/agents/AgentSidebar';
import { getProjectPlans, createProjectPlan } from '../../services/plannerService';
import { ProjectPlan, DevelopmentTask } from '../../types';
import { Kanban, Plus, CheckCircle2, Clock } from 'lucide-react';

export default function PlannerPage() {
  const [plans, setPlans] = useState<ProjectPlan[]>([]);
  const [tasks, setTasks] = useState<DevelopmentTask[]>([]);
  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');

  const loadData = async () => {
    try {
      const res = await getProjectPlans();
      setPlans(res.plans);
      setTasks(res.tasks);
    } catch {
      setPlans([]);
      setTasks([]);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await createProjectPlan({ projectName: name, summary });
      setName('');
      setSummary('');
      loadData();
    } catch {
      alert('Failed to create plan.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <SEOHead
        title="AI Project Planner | NexoApps AI Agents"
        description="Automated project requirement breakdown, target deadline planning, and development task matrix."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <AgentSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Kanban className="w-6 h-6 text-emerald-400" /> AI Project Requirement & Architecture Planner
              </h1>
              <p className="text-xs text-text-secondary">
                Generate project breakdown structures, requirement lists, and development task schedules.
              </p>
            </div>

            <form onSubmit={handleCreate} className="glass-panel p-5 rounded-3xl border border-white/10 space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Project Name (e.g. Batlytics AI Cricket Scorer v2.2)..."
                className="w-full px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Project goal description..."
                  className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1.5 transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Generate Plan</span>
                </button>
              </div>
            </form>

            {/* Plans List */}
            <div className="space-y-6">
              {plans.map((p) => (
                <div key={p.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-white text-base">{p.projectName}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                      Deadline: {p.targetDeadline}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">{p.summary}</p>
                  <div className="space-y-1.5 border-t border-white/10 pt-3">
                    <h4 className="text-xs font-bold text-text-muted uppercase">Requirements Breakdown</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-text-secondary">
                      {p.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
