import React from 'react';
import { ProjectActivity } from '../../types';
import { Activity, Rocket, UserPlus, Key, FolderPlus } from 'lucide-react';

interface ActivityTimelineProps {
  activities: ProjectActivity[];
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities }) => {
  return (
    <div className="space-y-4 text-left">
      {activities.map((act) => (
        <div key={act.id} className="glass-panel p-4 rounded-2xl border border-white/10 flex items-start gap-3 text-xs transition-all">
          <div className="w-8 h-8 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0 mt-0.5">
            <Activity className="w-4 h-4" />
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-white">{act.actorName}</span>
              <span className="text-[10px] text-text-muted font-mono">{new Date(act.createdAt).toLocaleString()}</span>
            </div>
            <span className="text-[11px] font-semibold text-brand-cyan block">{act.actionType}</span>
            <p className="text-text-secondary leading-relaxed">{act.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
