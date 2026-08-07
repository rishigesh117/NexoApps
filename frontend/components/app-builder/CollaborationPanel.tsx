import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Shield, Activity } from 'lucide-react';
import { collaborationService } from '../../services/collaborationService';

interface CollaborationPanelProps {
  applicationId?: string;
}

export const CollaborationPanel: React.FC<CollaborationPanelProps> = ({ applicationId = 'app-demo-1' }) => {
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollabData();
  }, [applicationId]);

  const fetchCollabData = async () => {
    setLoading(true);
    try {
      const [collabRes, actRes] = await Promise.all([
        collaborationService.listCollaborators(applicationId),
        collaborationService.listActivityLogs(applicationId)
      ]);
      if (collabRes.success) setCollaborators(collabRes.data);
      if (actRes.success) setActivities(actRes.data);
    } catch (err) {
      console.error('Failed to load collaboration data', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-brand-cyan" />
          Active Workspace Team Members
        </h3>
        <div className="space-y-3">
          {collaborators.map((c) => (
            <div key={c.id} className="p-3 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-white">{c.userId}</span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan uppercase">
                {c.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-violet" />
          Real-Time Studio Activity Feed
        </h3>
        <div className="space-y-3">
          {activities.map((a) => (
            <div key={a.id} className="p-3 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white">{a.userId}</span>
                <span className="text-text-muted"> executed </span>
                <span className="font-mono text-brand-cyan">{a.action}</span>
              </div>
              <span className="text-[10px] text-text-muted">{new Date(a.createdAt).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
