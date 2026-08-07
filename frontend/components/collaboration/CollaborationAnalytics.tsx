import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Users, MessageSquare, Video, FileText } from 'lucide-react';
import { getCollaborationAnalytics } from '../../services/collaborationAnalyticsService';
import { CollaborationAnalytics as AnalyticsType } from '../../../shared/types';

export const CollaborationAnalytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsType | null>(null);

  useEffect(() => {
    getCollaborationAnalytics().then(setData);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-brand-cyan" /> Collaboration Analytics
        </h2>
        <p className="text-text-muted text-sm">Enterprise metrics, usage trends, and workspace analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-cyan" /> Daily Activity Pulse
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm text-text-secondary">
              <span>Active Members</span>
              <span className="font-bold text-white">{data?.activeUsersDaily || 54}</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-brand-cyan h-full w-4/5"></div>
            </div>

            <div className="flex justify-between items-center text-sm text-text-secondary pt-2">
              <span>Messages Sent</span>
              <span className="font-bold text-white">{data?.messagesSent || 412}</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-brand-blue h-full w-3/4"></div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Video className="w-5 h-5 text-purple-400" /> Meetings & Documents
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm text-text-secondary">
              <span>Meetings Completed</span>
              <span className="font-bold text-white">{data?.meetingsHeld || 14}</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full w-3/5"></div>
            </div>

            <div className="flex justify-between items-center text-sm text-text-secondary pt-2">
              <span>Documents Created</span>
              <span className="font-bold text-white">{data?.docsCreated || 22}</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
