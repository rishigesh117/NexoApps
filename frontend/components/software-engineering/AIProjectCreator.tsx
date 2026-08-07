import React, { useState } from 'react';
import { Cpu, Wand2, Sparkles, Check } from 'lucide-react';
import { softwareProjectService } from '../../services/softwareProjectService';

export const AIProjectCreator: React.FC = () => {
  const [name, setName] = useState('');
  const [techStack, setTechStack] = useState('Express, TypeScript, SQLite, Docker, Jest');
  const [architecturePattern, setArchitecturePattern] = useState('microservices');
  const [description, setDescription] = useState('');
  const [created, setCreated] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await softwareProjectService.createProject({
        name,
        description,
        techStack,
        architecturePattern
      });
      if (res.success) setCreated(res.data);
    } catch (err) {
      console.error('Failed to create project', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6 max-w-2xl">
      <div className="flex items-center gap-2 pb-4 border-b border-white/10">
        <Wand2 className="w-5 h-5 text-brand-cyan" />
        <h3 className="text-base font-bold text-white">AI Autonomous Software Project Generator</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1">Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Autonomous Payments Microservice"
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1">Technology Stack</label>
          <input
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1">Architecture Pattern</label>
          <select
            value={architecturePattern}
            onChange={(e) => setArchitecturePattern(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
          >
            <option value="microservices">Microservices Architecture</option>
            <option value="monolith">Modular Monolith Architecture</option>
            <option value="serverless">Serverless Functions Architecture</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-bold text-xs shadow-glow-cyan hover:opacity-95 transition-all flex items-center gap-2"
        >
          <Wand2 className="w-4 h-4" />
          <span>{loading ? 'Synthesizing Project...' : 'Synthesize Complete Software Project'}</span>
        </button>
      </form>

      {created && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 font-bold flex items-center gap-2">
          <Check className="w-4 h-4" /> Software Project "{created.name}" Created Successfully!
        </div>
      )}
    </div>
  );
};
