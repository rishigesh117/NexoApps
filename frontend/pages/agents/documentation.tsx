import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AgentSidebar } from '../../components/agents/AgentSidebar';
import { getDocs, generateDoc } from '../../services/reviewService';
import { DocumentationRecord } from '../../types';
import { BookOpen, Plus, FileText } from 'lucide-react';

export default function DocumentationPage() {
  const [docs, setDocs] = useState<DocumentationRecord[]>([]);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('API Reference');

  const fetchDocs = async () => {
    try {
      const res = await getDocs();
      setDocs(res);
    } catch {
      setDocs([]);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await generateDoc(title, type);
      setTitle('');
      fetchDocs();
    } catch {
      alert('Failed to generate doc.');
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <>
      <SEOHead
        title="AI Technical Documentation Center | NexoApps AI Agents"
        description="Automated README generation, OpenAPI specifications, architecture diagrams, and user manuals."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <AgentSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-brand-cyan" /> AI Technical Documentation Generator
              </h1>
              <p className="text-xs text-text-secondary">
                Authored by Scribe Technical Writer AI Agent.
              </p>
            </div>

            <form onSubmit={handleGenerate} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center gap-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Document Title (e.g. NexoApps v2.2 OpenAPI Specification)..."
                className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-4 py-2.5 rounded-full bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              >
                <option value="API Reference">API Reference</option>
                <option value="README">README.md</option>
                <option value="Architecture">Architecture Doc</option>
                <option value="User Manual">User Manual</option>
              </select>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1.5 transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Generate Doc</span>
              </button>
            </form>

            <div className="space-y-4">
              {docs.map((d) => (
                <div key={d.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-cyan" /> {d.docTitle}
                    </h3>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                      {d.docType}
                    </span>
                  </div>
                  <pre className="font-mono text-xs text-emerald-400 bg-slate-900 p-4 rounded-2xl border border-white/5 overflow-x-auto leading-relaxed">
                    {d.content}
                  </pre>
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
