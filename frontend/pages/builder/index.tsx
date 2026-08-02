import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { BuilderSidebar } from '../../components/builder/BuilderSidebar';
import { PromptEditor } from '../../components/builder/PromptEditor';
import { TemplateGallery } from '../../components/builder/TemplateGallery';
import { getAITemplates } from '../../services/templateService';
import { createAIProject } from '../../services/builderService';
import { AITemplate } from '../../types';
import { Wand2, LayoutGrid } from 'lucide-react';
import { useRouter } from 'next/router';

export default function BuilderConsolePage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<AITemplate[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    getAITemplates().then((data) => setTemplates(data)).catch(() => {});
  }, []);

  const handleGenerate = async (prompt: string, framework: string) => {
    setIsGenerating(true);
    try {
      const newProj = await createAIProject({
        name: 'AI Generated App',
        promptUsed: prompt,
        framework,
      });
      router.push(`/builder/project/${newProj.id}`);
    } catch {
      alert('Generation failed.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <SEOHead
        title="AI Application Builder & Code Generator | NexoApps"
        description="Prompt-to-App AI scaffolding, low-code workflow automation, and reusable template marketplace."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <BuilderSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            {/* Header */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <Wand2 className="w-6 h-6 text-brand-cyan" /> AI Application Builder Console (v2.1)
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary">
                Generate full-stack application structures, React UI components, database schemas, and Express APIs instantly.
              </p>
            </div>

            <PromptEditor onGenerate={handleGenerate} isGenerating={isGenerating} />

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-2">
                <LayoutGrid className="w-4 h-4 text-emerald-400" /> Featured Application Templates
              </h3>
              <TemplateGallery templates={templates} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
