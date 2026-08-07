import React, { useState } from 'react';
import { Hash, Lock, Plus, MessageSquare } from 'lucide-react';

export const TeamChannelPanel: React.FC = () => {
  const [channels] = useState([
    { id: 'chan-general', name: 'general', type: 'public', topic: 'General team announcements & discussion' },
    { id: 'chan-architecture', name: 'architecture-v8.4', type: 'public', topic: 'Phase 11D AI Collaboration architecture' },
    { id: 'chan-security', name: 'security-rbac', type: 'private', topic: 'Access control and workspace security' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Hash className="w-6 h-6 text-brand-cyan" /> Team Channels
          </h2>
          <p className="text-text-muted text-sm">Organized communication channels for teams and projects</p>
        </div>
        <button className="px-4 py-2 bg-brand-cyan text-background font-semibold rounded-xl text-sm hover:opacity-90 transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Channel
        </button>
      </div>

      <div className="space-y-3">
        {channels.map((c) => (
          <div key={c.id} className="glass-panel p-4 rounded-xl border border-white/10 flex items-center justify-between hover:bg-white/5 transition">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-cyan/10 text-brand-cyan rounded-lg">
                {c.type === 'private' ? <Lock className="w-4 h-4" /> : <Hash className="w-4 h-4" />}
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">#{c.name}</h4>
                <p className="text-text-muted text-xs">{c.topic}</p>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-white/10 text-white rounded-lg text-xs font-semibold hover:bg-white/20 transition flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" /> Open Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
