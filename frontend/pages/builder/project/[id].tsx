import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SEOHead } from '../../../components/SEOHead';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { BuilderSidebar } from '../../../components/builder/BuilderSidebar';
import { GeneratedFilesExplorer } from '../../../components/builder/GeneratedFilesExplorer';
import { ExportPanel } from '../../../components/builder/ExportPanel';
import { getAIProjectDetails } from '../../../services/builderService';
import { AIProject, GeneratedFile } from '../../../types';
import { Wand2, Code, DownloadCloud } from 'lucide-react';

export default function BuilderProjectStudioPage() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<AIProject | null>(null);
  const [files, setFiles] = useState<GeneratedFile[]>([]);

  useEffect(() => {
    if (id) {
      getAIProjectDetails(id as string).then((data) => {
        if (data) {
          setProject(data.project);
          setFiles(data.files);
        }
      });
    }
  }, [id]);

  return (
    <>
      <SEOHead
        title={project ? `${project.name} | AI Builder Studio` : 'AI Project Studio'}
        description="Inspect generated code, components, database schema files, and export codebase."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <BuilderSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            {project && (
              <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-black text-white flex items-center gap-2">
                    <Wand2 className="w-6 h-6 text-brand-cyan" /> {project.name}
                  </h1>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                    {project.framework}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">{project.description}</p>
              </div>
            )}

            {files.length > 0 && <GeneratedFilesExplorer files={files} />}

            <ExportPanel projectId={(id as string) || 'aip-101'} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
