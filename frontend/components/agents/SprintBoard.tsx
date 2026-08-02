import React from 'react';
import { SprintTask } from '../../types';
import { CalendarDays, CheckCircle2, Clock, User } from 'lucide-react';

interface SprintBoardProps {
  tasks: SprintTask[];
}

export const SprintBoard: React.FC<SprintBoardProps> = ({ tasks }) => {
  const columns = ['To Do', 'In Progress', 'In Review', 'Done'] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
      {columns.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col);

        return (
          <div key={col} className="glass-panel p-4 rounded-3xl border border-white/10 space-y-3 bg-slate-900/50 min-h-[380px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-cyan" /> {col}
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-bold text-text-muted">
                {colTasks.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {colTasks.map((t) => (
                <div key={t.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:border-brand-cyan/40 transition-all shadow-lg">
                  <p className="font-semibold text-white text-xs leading-snug">{t.taskTitle}</p>
                  <div className="flex items-center justify-between text-[10px] text-text-muted pt-1 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-brand-cyan" /> {t.assignedTo}
                    </span>
                    <span className="font-bold text-amber-400">{t.points} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
