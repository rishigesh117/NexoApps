import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { OrganizationSidebar } from '../../components/workspace/OrganizationSidebar';
import { ProjectCard } from '../../components/workspace/ProjectCard';
import { getProjects, createProject } from '../../services/projectService';
import { OrganizationProject } from '../../types';
import { FolderGit2, Plus } from 'lucide-react';

export default function WorkspaceProjectsPage() {
  const [projects, setProjects] = useState<OrganizationProject[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Android App');
  const [showForm, setShowForm] = useState(false);

  const fetchProjectsData = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch {
      setProjects([]);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await createProject('org-101', name, description, category);
      setName('');
      setDescription('');
      setShowForm(false);
      fetchProjectsData();
    } catch {
      alert('Failed to create project.');
    }
  };

  useEffect(() => {
    fetchProjectsData();
  }, []);

  return (
    <>
      <SEOHead
        title="Organization Projects | NexoApps Workspace"
        description="Manage team projects, status tracking, Android builds, and hardware integration modules."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <OrganizationSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
              <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                  <FolderGit2 className="w-6 h-6 text-brand-cyan" /> Organization Projects Hub
                </h1>
                <p className="text-xs text-text-secondary mt-1">
                  Manage software development projects, version builds, and team member assignments.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(!showForm)}
                className="px-6 py-3 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet hover:shadow-glow-cyan flex items-center gap-2 transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{showForm ? 'Close Form' : 'New Project'}</span>
              </button>
            </div>

            {/* Create Project Form */}
            {showForm && (
              <form onSubmit={handleCreate} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 shadow-2xl">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Create New Workspace Project</h3>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white">Project Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Project Name..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white">Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Project description..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all"
                >
                  Create Project
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <ProjectCard key={proj.id} project={proj} />
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
