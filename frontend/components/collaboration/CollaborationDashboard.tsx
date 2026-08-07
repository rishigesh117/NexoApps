import React, { useEffect, useState } from 'react';
import { Users, MessageSquare, Video, FileText, Activity, ShieldCheck, Zap, Layers } from 'lucide-react';
import { getCollaborationAnalytics } from '../../services/collaborationAnalyticsService';
import { CollaborationAnalytics as AnalyticsType } from '../../../shared/types';

export const CollaborationDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsType | null>(null);

  useEffect(() => {
    getCollaborationAnalytics().then(setAnalytics);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-7 h-7 text-brand-cyan" /> AI Collaboration Platform
          </h1>
          <p className="text-text-muted text-sm">
            Digital Workplace & Enterprise Knowledge Workspace — Version 8.4
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan rounded-full text-xs font-semibold">
            Version 8.4 Active
          </span>
          <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full text-xs font-semibold">
            100% Backward Compatible
          </span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-text-muted text-xs uppercase tracking-wider font-semibold">Daily Active Members</div>
            <div className="text-3xl font-bold text-white mt-1">{analytics?.activeUsersDaily || 54}</div>
          </div>
          <div className="p-3 bg-brand-blue/20 text-brand-blue rounded-xl">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-text-muted text-xs uppercase tracking-wider font-semibold">Channel Messages</div>
            <div className="text-3xl font-bold text-white mt-1">{analytics?.messagesSent || 412}</div>
          </div>
          <div className="p-3 bg-brand-cyan/20 text-brand-cyan rounded-xl">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-text-muted text-xs uppercase tracking-wider font-semibold">Meetings Held</div>
            <div className="text-3xl font-bold text-white mt-1">{analytics?.meetingsHeld || 14}</div>
          </div>
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
            <Video className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-text-muted text-xs uppercase tracking-wider font-semibold">Documents Created</div>
            <div className="text-3xl font-bold text-white mt-1">{analytics?.docsCreated || 22}</div>
          </div>
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Overview Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-brand-cyan" /> Intelligent Workplace Capabilities
          </h2>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Multi-Tenant Workspace & Role RBAC Control
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Real-time Team Channels & Threaded Messaging
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Meeting Rooms with Session Recording & AI Transcripts
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Versioned Document Libraries & Permission Controls
            </li>
          </ul>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" /> Knowledge & Whiteboard Studio
          </h2>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-cyan" /> Shared Whiteboards with Sticky Notes & Spatial Canvas
            </li>
            <li className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-cyan" /> Enterprise Knowledge Base & AI Recommendation Engine
            </li>
            <li className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-cyan" /> Kanban Project Boards & Task Milestones
            </li>
            <li className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-cyan" /> Activity Feeds & Audit Logging Integration
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
