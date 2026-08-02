import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { PlatformSidebar } from '../../components/ai-platform/PlatformSidebar';
import { ModelCard } from '../../components/ai-platform/ModelCard';
import { getAIModels, registerAIModel } from '../../services/modelService';
import { AIModel } from '../../types';
import { Boxes, Plus } from 'lucide-react';

export default function ModelsPage() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [name, setName] = useState('');
  const [taskType, setTaskType] = useState<'LLM' | 'Computer Vision' | 'Audio' | 'Tabular'>('LLM');

  const fetchModels = async () => {
    try {
      const data = await getAIModels();
      setModels(data);
    } catch {
      setModels([]);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await registerAIModel({ name, taskType, framework: 'PyTorch / ONNX' });
      setName('');
      fetchModels();
    } catch {
      alert('Failed to register model.');
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <>
      <SEOHead
        title="Enterprise AI Model Registry | NexoApps AI Platform"
        description="Register, version control, and inspect production AI models across LLM, Vision, Audio, and Tabular tasks."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <PlatformSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Boxes className="w-6 h-6 text-brand-violet" /> Enterprise AI Model Registry & Marketplace
              </h1>
              <p className="text-xs text-text-secondary">
                Catalog models, manage weights artifacts, and publish deployment endpoints.
              </p>
            </div>

            <form onSubmit={handleRegister} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Model Name (e.g. Nexo-LLM 7B Instruct)..."
                className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              />
              <select
                value={taskType}
                onChange={(e) => setTaskType(e.target.value as any)}
                className="px-4 py-2.5 rounded-full bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              >
                <option value="LLM">Task: LLM</option>
                <option value="Tabular">Task: Tabular</option>
                <option value="Computer Vision">Task: Computer Vision</option>
                <option value="Audio">Task: Audio</option>
              </select>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1.5 transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Register Model</span>
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {models.map((m) => (
                <ModelCard key={m.id} model={m} />
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
