import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { OrganizationSidebar } from '../../components/workspace/OrganizationSidebar';
import { ActivityTimeline } from '../../components/workspace/ActivityTimeline';
import { getWorkspaceActivities } from '../../services/workspaceService';
import { ProjectActivity } from '../../types';
import { Activity } from 'lucide-react';

export default function WorkspaceActivityPage() {
  const [activities, setActivities] = useState<ProjectActivity[]>([]);

  useEffect(() => {
    getWorkspaceActivities('org-101')
      .then((data) => setActivities(data))
      .catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Workspace Activity Stream & Audit Logs | NexoApps"
        description="Real-time activity feed tracking project commits, build uploads, member roles, and security audit events."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <OrganizationSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Activity className="w-6 h-6 text-amber-400" /> Organization Activity Stream
              </h1>
              <p className="text-xs text-text-secondary">
                Real-time timeline of project milestones, build uploads, team membership updates, and API key usage.
              </p>
            </div>

            <ActivityTimeline activities={activities} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
