import React, { useState } from 'react';
import Head from 'next/head';
import { ShieldCheck, Play, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { deploymentPipelineService } from '../../services/deploymentPipelineService';

export default function AppTestingPage() {
  const [testResult, setTestResult] = useState<any>(null);
  const [running, setRunning] = useState(false);

  const handleRunTests = async () => {
    setRunning(true);
    try {
      const res = await deploymentPipelineService.runTests('app-demo-1');
      if (res.success) setTestResult(res.data);
    } catch (err) {
      console.error('Failed to run tests', err);
    } finally {
      setRunning(false);
    }
  };

  return (
    <>
      <Head>
        <title>Automated App Testing Suite | NexoApps Version 6.1</title>
        <meta name="description" content="Automated component & workflow validation suite." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          
          <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-cyan" />
                Automated Application Testing & Preview Sandbox
              </h1>
              <p className="text-xs text-text-muted mt-1">
                Run integration tests against Gateway routes, RAG vector searches, and low-code UI blocks.
              </p>
            </div>
            <button
              onClick={handleRunTests}
              disabled={running}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-bold text-xs shadow-glow-cyan hover:opacity-95 disabled:opacity-50 transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              <span>{running ? 'Running Validation Suite...' : 'Run Full Suite'}</span>
            </button>
          </div>

          {testResult && (
            <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                All Automated Assertions Passed Successfully
              </h3>
              <p className="text-xs text-text-secondary font-mono">Test Name: {testResult.testName}</p>
              <p className="text-xs text-text-secondary font-mono">Assertions: {testResult.results?.passed} passed / {testResult.results?.totalAsserts} total ({testResult.results?.durationMs}ms)</p>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
