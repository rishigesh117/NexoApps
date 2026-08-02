import React, { useState } from 'react';
import { fetchApi } from '../../services/apiClient';
import { Play, Sparkles, Zap, Clock, Code } from 'lucide-react';

export const InferenceConsole: React.FC = () => {
  const [modelSlug, setModelSlug] = useState('nexo-llm-7b-instruct');
  const [prompt, setPrompt] = useState('Write a PostgreSQL query for ball-by-ball cricket match statistics.');
  const [result, setResult] = useState<any | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleInference = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isRunning) return;
    setIsRunning(true);
    try {
      const res = await fetchApi<{ success: boolean; data: any }>('/ai-deployments/inference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelSlug, prompt }),
      });
      setResult(res.data);
    } catch {
      alert('Inference execution failed.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6 text-left shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-cyan" />
          <h3 className="text-base font-extrabold text-white">AI Inference Playground & Playground Studio</h3>
        </div>
        <select
          value={modelSlug}
          onChange={(e) => setModelSlug(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
        >
          <option value="nexo-llm-7b-instruct">Nexo-LLM 7B Instruct (LLM)</option>
          <option value="batlytics-match-outcome-predictor">Batlytics Predictor (Tabular)</option>
        </select>
      </div>

      <form onSubmit={handleInference} className="space-y-4">
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter inference prompt..."
          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan leading-relaxed"
        />

        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Edge GPU Inference Cluster
          </span>
          <button
            type="submit"
            disabled={isRunning}
            className="px-6 py-2.5 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet hover:shadow-glow-cyan flex items-center gap-2 transition-all"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>{isRunning ? 'Running Inference...' : 'Execute Model Inference'}</span>
          </button>
        </div>
      </form>

      {result && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-text-muted">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <Clock className="w-3.5 h-3.5" /> Latency: {result.latencyMs} ms
            </span>
            <span>
              Tokens: {result.usage.promptTokens} in / {result.usage.completionTokens} out ({result.usage.totalTokens} total)
            </span>
          </div>
          <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
            {result.output}
          </pre>
        </div>
      )}
    </div>
  );
};
