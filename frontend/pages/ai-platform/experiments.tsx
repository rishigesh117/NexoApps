import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { PlatformSidebar } from '../../components/ai-platform/PlatformSidebar';
import { getExperiments } from '../../services/experimentService';
import { Experiment, ExperimentRun } from '../../types';
import { FlaskConical, Trophy, Zap } from 'lucide-react';

export default function ExperimentsPage() {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [runs, setRuns] = useState<ExperimentRun[]>([]);

  useEffect(() => {
    getExperiments().then((res) => {
      setExperiments(res.experiments);
      setRuns(res.runs);
    }).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="AI Experimentation & Benchmarking | NexoApps AI Platform"
        description="Compare model performance, accuracy scores, prompt variants, and latency benchmarks."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <PlatformSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <FlaskConical className="w-6 h-6 text-rose-400" /> AI Experimentation & Model Benchmark Matrix
              </h1>
              <p className="text-xs text-text-secondary">
                Side-by-side comparison of model accuracy, prompt engineering variants, and edge latency scores.
              </p>
            </div>

            <div className="space-y-4">
              {runs.map((r) => (
                <div key={r.id} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center justify-between gap-4 shadow-2xl">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <h4 className="font-extrabold text-white text-sm">{r.modelName}</h4>
                    </div>
                    <p className="text-xs text-text-muted">{r.promptVariant}</p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-emerald-400 font-bold">Accuracy: {r.accuracyScore}%</span>
                    <span className="text-brand-cyan font-bold">{r.latencyMs} ms</span>
                  </div>
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
