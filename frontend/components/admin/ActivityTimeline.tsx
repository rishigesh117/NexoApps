import React from 'react';
import { ActivityLogItem } from '../../types';
import { Activity, Clock, Shield } from 'lucide-react';

interface ActivityTimelineProps {
  activity: ActivityLogItem[];
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activity }) => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-violet" />
          <h3 className="text-base font-bold text-white">Admin Audit Log & Activity</h3>
        </div>
        <span className="text-xs text-text-muted">Security Audit Trail</span>
      </div>

      <div className="space-y-3 relative pl-4 border-l border-white/10">
        {activity.map((item) => (
          <div key={item.id} className="relative space-y-1 text-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-cyan absolute -left-[21px] top-1.5 ring-4 ring-slate-950" />

            <div className="flex items-center justify-between">
              <span className="font-bold text-white">{item.action}</span>
              <span className="text-[10px] text-text-muted flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <p className="text-text-secondary text-[11px] leading-relaxed">{item.details}</p>

            <div className="flex items-center gap-2 text-[10px] text-text-muted pt-0.5">
              <span>By {item.adminName}</span>
              <span>•</span>
              <span className="font-mono">{item.ipAddress}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
