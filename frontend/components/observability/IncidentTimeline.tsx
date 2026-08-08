import React from 'react';
import { Clock, MessageSquare, AlertCircle } from 'lucide-react';
import { IncidentEvent } from '../../../shared/types';

export const IncidentTimeline: React.FC<{ timeline: IncidentEvent[] }> = ({ timeline }) => {
  return (
    <div className="space-y-4 pt-2">
      <h4 className="text-xs uppercase font-semibold text-text-muted">Incident Audit Timeline</h4>
      <div className="space-y-3 relative pl-4 border-l border-white/10">
        {timeline.map((evt) => (
          <div key={evt.id} className="relative space-y-1">
            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-brand-cyan"></div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white uppercase">{evt.eventType.replace('_', ' ')}</span>
              <span className="text-[10px] text-text-muted">{new Date(evt.createdAt).toLocaleTimeString()}</span>
            </div>
            {evt.note && <p className="text-xs text-text-muted bg-white/5 p-2 rounded">{evt.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
