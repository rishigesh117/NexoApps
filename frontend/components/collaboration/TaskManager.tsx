import React, { useState } from 'react';
import { CheckSquare, Plus, User, Clock } from 'lucide-react';

export const TaskManager: React.FC = () => {
  const [tasks] = useState([
    { id: 'tk-1', title: 'Verify TypeScript compilation across all collaboration pages', assignee: 'user-dev', due: 'Today', status: 'In Progress' },
    { id: 'tk-2', title: 'Conduct node --check syntax audit for backend controllers', assignee: 'user-admin', due: 'Tomorrow', status: 'Pending' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-brand-cyan" /> Task Manager
          </h2>
          <p className="text-text-muted text-sm">Individual and team task assignment</p>
        </div>
        <button className="px-4 py-2 bg-brand-cyan text-background font-semibold rounded-xl text-sm hover:opacity-90 transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Task
        </button>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {tasks.map((tk) => (
          <div key={tk.id} className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm">{tk.title}</h4>
              <p className="text-text-muted text-xs flex items-center gap-2 mt-1">
                <span><User className="w-3.5 h-3.5 inline text-brand-cyan" /> {tk.assignee}</span>
                <span><Clock className="w-3.5 h-3.5 inline text-amber-400" /> Due: {tk.due}</span>
              </p>
            </div>
            <span className="px-2.5 py-1 bg-brand-cyan/20 text-brand-cyan text-xs font-semibold rounded-lg">{tk.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
