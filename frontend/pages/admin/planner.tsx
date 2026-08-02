import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { SprintBoard } from '../../components/agents/SprintBoard';
import { getSprints } from '../../services/sprintService';
import { SprintBoard as ISprintBoard, SprintTask } from '../../types';
import { CalendarDays } from 'lucide-react';

export default function AdminPlannerPage() {
  const [sprints, setSprints] = useState<ISprintBoard[]>([]);
  const [tasks, setTasks] = useState<SprintTask[]>([]);

  useEffect(() => {
    getSprints().then((res) => {
      setSprints(res.sprints);
      setTasks(res.tasks);
    }).catch(() => {});
  }, []);

  return (
    <AdminLayout title="Admin Sprint Planner | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-amber-400" /> Enterprise Sprint Planner & Kanban
          </h1>
          <p className="text-xs text-text-secondary">
            Manage active AI development sprints, task point assignments, and completion milestones.
          </p>
        </div>

        <SprintBoard tasks={tasks} />
      </div>
    </AdminLayout>
  );
}
