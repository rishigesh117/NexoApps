import React from 'react';
import { Sparkles, Bot, Image as ImageIcon, Database, Mic, Cpu, Globe, Sliders, BarChart3, Plus } from 'lucide-react';

interface ComponentPaletteProps {
  onSelectType: (type: string, name: string) => void;
}

export const ComponentPalette: React.FC<ComponentPaletteProps> = ({ onSelectType }) => {
  const blocks = [
    { type: 'chatbot_builder', name: 'AI Chatbot Canvas', icon: Bot, category: 'AI Core', color: 'text-brand-cyan' },
    { type: 'prompt_block', name: 'Prompt Template Injector', icon: Sparkles, category: 'Prompts', color: 'text-brand-violet' },
    { type: 'image_gen_block', name: 'Text-to-Image Generator', icon: ImageIcon, category: 'Multimodal', color: 'text-cyan-400' },
    { type: 'knowledge_base_block', name: 'Vector RAG Connector', icon: Database, category: 'Data & RAG', color: 'text-emerald-400' },
    { type: 'voice_ai_block', name: 'Voice TTS/STT Engine', icon: Mic, category: 'Multimodal', color: 'text-rose-400' },
    { type: 'agent_node', name: 'Autonomous Agent Node', icon: Cpu, category: 'Agents', color: 'text-amber-400' },
    { type: 'api_connector', name: 'REST API Connector', icon: Globe, category: 'Integrations', color: 'text-blue-400' },
    { type: 'form_builder', name: 'Dynamic Form Builder', icon: Sliders, category: 'UI Elements', color: 'text-teal-400' },
    { type: 'dashboard_chart', name: 'Analytics KPI Chart', icon: BarChart3, category: 'Analytics', color: 'text-purple-400' }
  ];

  return (
    <div className="glass-panel p-4 rounded-3xl border border-white/10 h-full flex flex-col justify-between overflow-y-auto scrollbar-none">
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted px-1">Component Palette</h3>

        <div className="space-y-2">
          {blocks.map((b) => {
            const Icon = b.icon;
            return (
              <button
                key={b.type}
                onClick={() => onSelectType(b.type, b.name)}
                className="w-full p-3 rounded-2xl bg-surface-100/60 hover:bg-surface-200 border border-white/10 hover:border-brand-cyan/40 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-white/5 ${b.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-brand-cyan transition-colors">{b.name}</h4>
                    <p className="text-[10px] text-text-muted">{b.category}</p>
                  </div>
                </div>
                <Plus className="w-4 h-4 text-text-muted group-hover:text-brand-cyan transition-colors" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
