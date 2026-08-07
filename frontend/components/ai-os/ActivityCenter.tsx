import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { workspaceOsService } from '../../services/workspaceOsService';

export const ActivityCenter: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    fetchActs();
  }, []);

  const fetchActs = async () => {
    try {
      const res = await workspaceOsService.listActivities();
      if (res.success) setActivities(res.data);
    } catch (err) {
      console.error('Failed to load activities', err);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <Activity className="w-5 h-5 text-amber-400" />
        Real-Time System Activity Stream & Audit Trail
      </h3>

      <div className="space-y-3">
        {activities.map((a) => (
          <div key={a.id} className="p-4 rounded-2xl bg-surface-100 border border-white/10 text-xs flex items-center justify-between">
            <div>
              <span className="font-bold text-white">{a.actionTitle}</span>
              <p className="text-text-muted mt-0.5">{a.details}</p>
            </div>
            <span className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 px-2.5 py-0.5 rounded-full border border-brand-cyan/30 uppercase">
              {a.moduleKey}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
