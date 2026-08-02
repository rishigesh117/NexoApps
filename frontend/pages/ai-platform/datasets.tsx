import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { PlatformSidebar } from '../../components/ai-platform/PlatformSidebar';
import { getDatasets, createDataset } from '../../services/datasetService';
import { Dataset } from '../../types';
import { Database, Plus, FileText, HardDrive } from 'lucide-react';

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Tabular / Sports');

  const fetchDs = async () => {
    try {
      const data = await getDatasets();
      setDatasets(data);
    } catch {
      setDatasets([]);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await createDataset({ name, category, fileFormat: 'Parquet / CSV', sizeMb: 24.5 });
      setName('');
      fetchDs();
    } catch {
      alert('Failed to upload dataset.');
    }
  };

  useEffect(() => {
    fetchDs();
  }, []);

  return (
    <>
      <SEOHead
        title="AI Training Dataset Library | NexoApps AI Platform"
        description="Dataset versioning, file format manager, and training dataset catalog."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <PlatformSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Database className="w-6 h-6 text-amber-400" /> AI Training Dataset Library & Versioning
              </h1>
              <p className="text-xs text-text-secondary">
                Upload and version training datasets for LLM instruction tuning and ML predictive models.
              </p>
            </div>

            <form onSubmit={handleCreate} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dataset Title..."
                className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1.5 transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Dataset</span>
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {datasets.map((ds) => (
                <div key={ds.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {ds.category}
                    </span>
                    <span className="text-[11px] font-mono text-text-muted flex items-center gap-1">
                      <HardDrive className="w-3.5 h-3.5" /> {ds.sizeMb} MB
                    </span>
                  </div>
                  <h3 className="font-extrabold text-white text-base leading-tight">{ds.name}</h3>
                  <p className="text-xs text-text-secondary">{ds.description}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
