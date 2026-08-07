import React, { useState, useEffect } from 'react';
import { Sliders, Sparkles, Check } from 'lucide-react';
import { ApplicationComponent } from '../../../shared/types';

interface PropertyInspectorProps {
  component: ApplicationComponent | null;
}

export const PropertyInspector: React.FC<PropertyInspectorProps> = ({ component }) => {
  const [modelKey, setModelKey] = useState('gpt-4o');
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (component) {
      setName(component.name);
      setModelKey(component.props?.modelKey || 'gpt-4o');
    }
  }, [component]);

  if (!component) {
    return (
      <div className="glass-panel p-4 rounded-3xl border border-white/10 h-full flex items-center justify-center text-xs text-text-muted">
        Select a component on the canvas to inspect & configure properties.
      </div>
    );
  }

  const handleSaveProps = (e: React.FormEvent) => {
    e.preventDefault();
    component.name = name;
    component.props = { ...component.props, modelKey };
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="glass-panel p-4 rounded-3xl border border-white/10 h-full flex flex-col justify-between overflow-y-auto scrollbar-none space-y-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <span className="text-xs font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-brand-cyan" />
            Property Inspector
          </span>
          <span className="text-[10px] font-mono text-brand-cyan">{component.componentType}</span>
        </div>

        <form onSubmit={handleSaveProps} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1">Component Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1">AI Gateway Model Route</label>
            <select
              value={modelKey}
              onChange={(e) => setModelKey(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none font-mono"
            >
              <option value="gpt-4o">OpenAI GPT-4o</option>
              <option value="claude-3-5-sonnet-20241022">Anthropic Claude 3.5 Sonnet</option>
              <option value="gemini-1.5-pro">Google Gemini 1.5 Pro</option>
              <option value="grok-2">xAI Grok 2</option>
              <option value="llama-3.3-70b-versatile">Groq Llama 3.3 70B</option>
              <option value="llama3.1:8b">Ollama Local Llama 3.1 8B</option>
            </select>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            {saved && (
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                <Check className="w-3 h-3" /> Saved
              </span>
            )}
            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-brand-cyan text-slate-950 font-bold text-xs shadow-glow-cyan hover:opacity-90 transition-all"
            >
              Apply Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
