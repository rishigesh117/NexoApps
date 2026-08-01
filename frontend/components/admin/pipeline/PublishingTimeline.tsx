import React from 'react';
import { TimelineEvent } from '../../../types';
import { Activity, Clock, ShieldCheck, Rocket, Archive, FileEdit, Trash2 } from 'lucide-react';

interface TimelineProps {
  events: TimelineEvent[];
}

export const PublishingTimeline: React.FC<TimelineProps> = ({ events }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'Published':
        return <Rocket className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Archived':
        return <Archive className="w-3.5 h-3.5 text-purple-400" />;
      case 'Validated':
        return <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" />;
      case 'Deleted':
        return <Trash2 className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <FileEdit className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-cyan" />
          <h3 className="text-base font-bold text-white">App Lifecycle Publishing Timeline</h3>
        </div>
        <span className="text-xs text-text-muted">Audit History</span>
      </div>

      <div className="space-y-4 relative pl-4 border-l border-white/10">
        {events.map((evt) => (
          <div key={evt.id} className="relative space-y-1 text-xs">
            <div className="w-3 h-3 rounded-full bg-slate-900 border border-brand-cyan flex items-center justify-center absolute -left-[23px] top-1">
              {getEventIcon(evt.eventType)}
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold text-white">{evt.eventType}</span>
              <span className="text-[10px] text-text-muted flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(evt.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <p className="text-text-secondary text-[11px] leading-relaxed">{evt.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
