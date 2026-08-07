import React, { useState, useEffect } from 'react';
import { Cpu, ShieldCheck, Plus, Activity, RefreshCw, Key, CheckCircle, AlertTriangle } from 'lucide-react';
import { providerService } from '../../services/providerService';
import { AIProvider } from '../../../shared/types';

export const ProviderManager: React.FC = () => {
  const [providers, setProviders] = useState<AIProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProvName, setNewProvName] = useState('');
  const [newProvType, setNewProvType] = useState('custom');
  const [newBaseUrl, setNewBaseUrl] = useState('');

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const res = await providerService.listProviders();
      if (res.success) {
        setProviders(res.data);
      }
    } catch (err) {
      console.error('Failed to load providers', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProvider = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProvName) return;
    try {
      const res = await providerService.createProvider({
        name: newProvName,
        providerType: newProvType,
        apiBaseUrl: newBaseUrl,
      });
      if (res.success) {
        setShowAddModal(false);
        setNewProvName('');
        setNewBaseUrl('');
        fetchProviders();
      }
    } catch (err) {
      console.error('Failed to add provider', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-brand-cyan" />
            AI Provider Ecosystem Manager
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Configure & orchestrate 13+ enterprise LLM providers, local models, and custom REST API endpoints.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchProviders}
            className="p-2.5 rounded-xl bg-surface-100 border border-white/10 hover:border-brand-cyan/40 text-text-secondary hover:text-white transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white text-xs font-semibold shadow-glow-cyan hover:opacity-95 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add AI Provider</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {providers.map((prov) => (
          <div key={prov.id} className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-brand-cyan/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan uppercase tracking-wider">
                  {prov.providerType}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  prov.healthStatus === 'healthy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}>
                  <CheckCircle className="w-3 h-3" />
                  {prov.healthStatus}
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-brand-cyan transition-colors">{prov.name}</h3>
              <p className="text-xs text-text-muted mt-1 font-mono truncate">{prov.apiBaseUrl || 'Default Gateway URL'}</p>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-text-muted flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-brand-violet" />
                API Key Configured
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" />
                Active
              </span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md glass-panel p-6 rounded-3xl border border-white/20 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Register New AI Provider</h3>
            <form onSubmit={handleCreateProvider} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Provider Name</label>
                <input
                  type="text"
                  value={newProvName}
                  onChange={(e) => setNewProvName(e.target.value)}
                  placeholder="e.g. Together AI / Local VLLM"
                  className="w-full px-3.5 py-2 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Provider Type</label>
                <select
                  value={newProvType}
                  onChange={(e) => setNewProvType(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
                >
                  <option value="openai">OpenAI Compatible</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="gemini">Google Gemini</option>
                  <option value="xai">xAI Grok</option>
                  <option value="mistral">Mistral</option>
                  <option value="groq">Groq</option>
                  <option value="ollama">Ollama (Local)</option>
                  <option value="custom">Custom REST Provider</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Base API URL</label>
                <input
                  type="text"
                  value={newBaseUrl}
                  onChange={(e) => setNewBaseUrl(e.target.value)}
                  placeholder="https://api.example.com/v1"
                  className="w-full px-3.5 py-2 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-surface-100 hover:bg-surface-200 text-text-secondary text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-cyan text-slate-950 font-bold text-xs shadow-glow-cyan hover:opacity-90"
                >
                  Save Provider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
