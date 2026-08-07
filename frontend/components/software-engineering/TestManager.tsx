import React, { useState } from 'react';
import { Play, CheckCircle2, RefreshCw } from 'lucide-react';
import { testingService } from '../../services/testingService';

interface TestManagerProps {
  projectId?: string;
}

export const TestManager: React.FC<TestManagerProps> = ({ projectId = 'proj-demo-1' }) => {
  const [testResult, setTestResult] = useState<any>(null);
  const [running, setRunning] = useState(false);

  const handleRunTests = async () => {
    setRunning(true);
    try {
      const res = await testingService.runTests(projectId);
      if (res.success) setTestResult(res.data);
    } catch (err) {
      console.error('Failed to run tests', err);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Play className="w-5 h-5 text-emerald-400" />
            Automated Unit & Integration Testing Suite
          </h3>
          <p className="text-xs text-text-muted mt-1">Execute test assertions across microservice components.</p>
        </div>
        <button
          onClick={handleRunTests}
          disabled={running}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-bold text-xs shadow-glow-cyan hover:opacity-95 disabled:opacity-50 transition-all flex items-center gap-2"
        >
          {running ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          <span>{running ? 'Running Assertions...' : 'Execute Test Suite'}</span>
        </button>
      </div>

      {testResult && (
        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-3">
          <div className="flex items-center justify-between font-bold text-emerald-400">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> All Tests Passed Successfully</span>
            <span>Duration: {testResult.durationMs}ms</span>
          </div>
          <div className="space-y-2 pt-2 border-t border-emerald-500/20">
            {testResult.suites?.map((s: any, i: number) => (
              <div key={i} className="flex items-center justify-between text-text-secondary">
                <span>{s.name}</span>
                <span className="font-mono text-emerald-400">{s.passed} / {s.total} passed</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
