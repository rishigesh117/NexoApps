import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AgentSidebar } from '../../components/agents/AgentSidebar';
import { SprintBoard } from '../../components/agents/SprintBoard';
import { getSprints } from '../../services/sprintService';
import { SprintBoard as ISprintBoard, SprintTask } from '../../types';
import { CalendarDays } from 'lucide-react';

export default function SprintsPage() {
  const [sprints, setSprints] = useState<ISprintBoard[]>([]);
  const [tasks, setTasks] = useState<SprintTask[]>([]);

  useEffect(() => {
    getSprints().then((res) => {
      setSprints(res.sprints);
      setTasks(res.tasks);
    }).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="AI Sprint Kanban Board | NexoApps AI Agents"
        description="Automated sprint planning, task tracking, and story point estimations by Athena Scrum Master AI."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <AgentSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            {sprints.length > 0 && (
              <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-black text-white flex items-center gap-2">
                    <CalendarDays className="w-6 h-6 text-amber-400" /> {sprints[0].name}
                  </h1>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    {sprints[0].startDate} → {sprints[0].endDate}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">{sprints[0].sprintGoal}</p>
              </div>
            )}

            <SprintBoard tasks={tasks} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
