import React, { useState } from 'react';
import { Activity, User, FileText, MessageSquare, Video } from 'lucide-react';

export const ActivityFeed: React.FC = () => {
  const [activities] = useState([
    { id: 'act-1', actor: 'user-admin', action: 'created room', target: 'Sprint Planning Room', time: '10m ago', icon: Video },
    { id: 'act-2', actor: 'user-dev', action: 'posted message in', target: '#general', time: '25m ago', icon: MessageSquare },
    { id: 'act-3', actor: 'user-admin', action: 'uploaded document', target: 'Version 8.4 Architecture Spec', time: '1h ago', icon: FileText }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity className="w-6 h-6 text-brand-cyan" /> Workspace Activity Feed
        </h2>
        <p className="text-text-muted text-sm">Real-time collaboration activity stream across all teams</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="p-2 bg-brand-cyan/20 text-brand-cyan rounded-lg">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 text-xs">
                <span className="font-bold text-white">{act.actor}</span>{' '}
                <span className="text-text-muted">{act.action}</span>{' '}
                <span className="font-semibold text-brand-cyan">{act.target}</span>
              </div>
              <span className="text-text-muted text-xs font-mono">{act.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
