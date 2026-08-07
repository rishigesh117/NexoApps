import React, { useState } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';
import { codeGenerationService } from '../../services/codeGenerationService';

interface CodeGenerationPanelProps {
  projectId?: string;
}

export const CodeGenerationPanel: React.FC<CodeGenerationPanelProps> = ({ projectId = 'proj-demo-1' }) => {
  const [prompt, setPrompt] = useState('');
  const [targetFilePath, setTargetFilePath] = useState('src/controllers/payment.controller.ts');
  const [result, setResult] = useState<any>(null);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const res = await codeGenerationService.generateCode(projectId, prompt, targetFilePath);
      if (res.success) setResult(res.data);
    } catch (err) {
      console.error('Failed code generation', err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-brand-cyan" />
        AI Full-Stack Code Synthesizer
      </h3>

      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1">Natural Language Feature Prompt</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Generate Stripe webhook signature validation middleware"
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1">Target File Path</label>
          <input
            type="text"
            value={targetFilePath}
            onChange={(e) => setTargetFilePath(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none font-mono"
          />
        </div>

        <button
          type="submit"
          disabled={generating}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-bold text-xs shadow-glow-cyan hover:opacity-95 disabled:opacity-50 transition-all flex items-center gap-2"
        >
          <Wand2 className="w-4 h-4" />
          <span>{generating ? 'Synthesizing Source Code...' : 'Generate Code'}</span>
        </button>
      </form>

      {result && (
        <div className="space-y-2">
          <span className="text-xs font-mono text-brand-cyan">Generated Code for {result.targetFilePath}:</span>
          <pre className="p-4 rounded-2xl bg-background/80 border border-white/10 text-xs font-mono text-text-secondary whitespace-pre-wrap">
            {result.generatedCode}
          </pre>
        </div>
      )}
    </div>
  );
};
