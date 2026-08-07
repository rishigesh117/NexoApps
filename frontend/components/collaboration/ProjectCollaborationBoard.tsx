import React, { useState } from 'react';
import { Layout, Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export const ProjectCollaborationBoard: React.FC = () => {
  const [tasks] = useState([
    { id: 't1', title: 'Phase 11D Backend Verification', status: 'done', priority: 'high' },
    { id: 't2', title: 'Frontend Collaboration Components', status: 'in_progress', priority: 'urgent' },
    { id: 't3', title: '100% Backward Compatibility Audit', status: 'todo', priority: 'medium' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layout className="w-6 h-6 text-brand-cyan" /> Project Collaboration Board
          </h2>
          <p className="text-text-muted text-sm">Kanban task management & milestone tracking</p>
        </div>
        <button className="px-4 py-2 bg-brand-cyan text-background font-semibold rounded-xl text-sm hover:opacity-90 transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* To Do Column */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-3">
          <h4 className="font-bold text-white text-sm flex items-center justify-between">
            <span>To Do</span>
            <span className="px-2 py-0.5 bg-white/10 text-xs rounded-full">1</span>
          </h4>
          {tasks.filter(t => t.status === 'todo').map(t => (
            <div key={t.id} className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
              <span className="text-xs text-amber-400 font-semibold uppercase">{t.priority}</span>
              <p className="text-white text-xs font-medium">{t.title}</p>
            </div>
          ))}
        </div>

        {/* In Progress Column */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-3">
          <h4 className="font-bold text-brand-cyan text-sm flex items-center justify-between">
            <span>In Progress</span>
            <span className="px-2 py-0.5 bg-brand-cyan/20 text-xs rounded-full">1</span>
          </h4>
          {tasks.filter(t => t.status === 'in_progress').map(t => (
            <div key={t.id} className="p-3 bg-white/5 rounded-xl border border-brand-cyan/30 space-y-1">
              <span className="text-xs text-rose-400 font-semibold uppercase">{t.priority}</span>
              <p className="text-white text-xs font-medium">{t.title}</p>
            </div>
          ))}
        </div>

        {/* Completed Column */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-3">
          <h4 className="font-bold text-emerald-400 text-sm flex items-center justify-between">
            <span>Done</span>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-xs rounded-full">1</span>
          </h4>
          {tasks.filter(t => t.status === 'done').map(t => (
            <div key={t.id} className="p-3 bg-white/5 rounded-xl border border-emerald-500/30 space-y-1">
              <span className="text-xs text-emerald-400 font-semibold uppercase">{t.priority}</span>
              <p className="text-white text-xs font-medium">{t.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
