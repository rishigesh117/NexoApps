import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Sparkles, Cpu, Wand2, GitBranch, Layers, Shield, Play } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { ProjectDashboard } from '../../components/software-engineering/ProjectDashboard';
import { DeveloperAssistant } from '../../components/software-engineering/DeveloperAssistant';
import { softwareProjectService } from '../../services/softwareProjectService';
import { SoftwareProject } from '../../../shared/types';

export default function SoftwareEngineeringHubPage() {
  const [projects, setProjects] = useState<SoftwareProject[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await softwareProjectService.listProjects();
      if (res.success) setProjects(res.data);
    } catch (err) {
      console.error('Failed to load software projects', err);
    }
  };

  return (
    <>
      <Head>
        <title>Autonomous AI Software Engineering Platform | NexoApps Version 6.3</title>
        <meta name="description" content="AI-driven software engineering, code generation, architecture design, and SDLC automation." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> NexoApps Version 6.3 Release
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight">
              Autonomous AI <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet bg-clip-text text-transparent">Software Engineering Studio</span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto">
              Design, generate, review, test, secure, document, and deploy complete software projects with autonomous AI copilots.
            </p>
          </div>

          <div className="space-y-6">
            {projects.map((p) => (
              <ProjectDashboard key={p.id} project={p} />
            ))}
          </div>

          <DeveloperAssistant />
        </div>
      </main>
    </>
  );
}
