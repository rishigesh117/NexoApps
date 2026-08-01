import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { OrganizationSidebar } from '../../components/workspace/OrganizationSidebar';
import { OrganizationCard } from '../../components/workspace/OrganizationCard';
import { ProjectCard } from '../../components/workspace/ProjectCard';
import { CreateOrganizationModal } from '../../components/workspace/CreateOrganizationModal';
import { getWorkspaceOverview } from '../../services/workspaceService';
import { getProjects } from '../../services/projectService';
import { Organization, OrganizationProject } from '../../types';
import { Building2, Plus, Users, FolderGit2, Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WorkspaceOverviewPage() {
  const [overview, setOverview] = useState<any>(null);
  const [projects, setProjects] = useState<OrganizationProject[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchData = async () => {
    try {
      const [ovData, projData] = await Promise.all([
        getWorkspaceOverview(),
        getProjects(),
      ]);
      setOverview(ovData);
      setProjects(projData);
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <SEOHead
        title="Team Workspace & Organization Overview | NexoApps"
        description="Collaborate with developer teams, manage organization projects, invite members, and track deployments."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <OrganizationSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            {/* Header */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-brand-cyan" /> Team Workspace & Organization Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">
                  Collaborative workspace inspired by GitHub Orgs and Google Play Console Teams.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet hover:shadow-glow-cyan flex items-center gap-2 transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>New Organization</span>
              </button>
            </div>

            {/* Active Organization Card */}
            {overview?.activeOrganization && (
              <OrganizationCard organization={overview.activeOrganization} />
            )}

            {/* Active Projects */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-brand-cyan" /> Workspace Projects ({projects.length})
                </h3>
                <Link href="/workspace/projects" className="text-xs font-bold text-brand-cyan hover:underline flex items-center gap-1">
                  View All Projects <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <ProjectCard key={proj.id} project={proj} />
                ))}
              </div>
            </div>
          </div>
        </main>

        {showCreateModal && (
          <CreateOrganizationModal
            onSuccess={() => {
              setShowCreateModal(false);
              fetchData();
            }}
            onClose={() => setShowCreateModal(false)}
          />
        )}

        <Footer />
      </div>
    </>
  );
}
