import React, { useState, useEffect } from 'react';
import { Bug, Check, Wand2 } from 'lucide-react';
import { engineeringAnalyticsService } from '../../services/engineeringAnalyticsService';

interface BugTrackerProps {
  projectId?: string;
}

export const BugTracker: React.FC<BugTrackerProps> = ({ projectId = 'proj-demo-1' }) => {
  const [bugs, setBugs] = useState<any[]>([]);

  useEffect(() => {
    fetchBugs();
  }, [projectId]);

  const fetchBugs = async () => {
    try {
      const res = await engineeringAnalyticsService.listBugs(projectId);
      if (res.success) setBugs(res.data);
    } catch (err) {
      console.error('Failed to load bugs', err);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <Bug className="w-5 h-5 text-rose-400" />
        AI Bug Tracker & Automated Patch Fixer
      </h3>

      <div className="space-y-3">
        {bugs.map((b) => (
          <div key={b.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">{b.title}</h4>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 uppercase">
                {b.severity}
              </span>
            </div>
            <p className="text-xs text-text-muted">{b.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
