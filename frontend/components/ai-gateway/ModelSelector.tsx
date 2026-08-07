import React, { useState, useEffect } from 'react';
import { Boxes, Sparkles, ChevronDown, Check, Zap, Eye, Mic } from 'lucide-react';
import { providerService } from '../../services/providerService';
import { ProviderModel } from '../../../shared/types';

interface ModelSelectorProps {
  selectedModelKey?: string;
  onSelectModel?: (model: ProviderModel) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModelKey, onSelectModel }) => {
  const [models, setModels] = useState<ProviderModel[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentModel, setCurrentModel] = useState<ProviderModel | null>(null);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const res = await providerService.listModels();
      if (res.success && res.data.length > 0) {
        setModels(res.data);
        const match = res.data.find((m: ProviderModel) => m.modelKey === selectedModelKey) || res.data[0];
        setCurrentModel(match);
      }
    } catch (err) {
      console.error('Failed to load models', err);
    }
  };

  const handleSelect = (m: ProviderModel) => {
    setCurrentModel(m);
    if (onSelectModel) onSelectModel(m);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 rounded-xl bg-surface-100 border border-white/10 hover:border-brand-cyan/40 text-white flex items-center justify-between text-xs font-medium transition-all shadow-sm"
      >
        <div className="flex items-center gap-2.5 truncate">
          <Sparkles className="w-4 h-4 text-brand-cyan shrink-0" />
          <span className="font-bold truncate">{currentModel ? currentModel.modelName : 'Select Model'}</span>
          {currentModel && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan font-mono">
              {currentModel.modelKey}
            </span>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-12 z-50 glass-panel p-2 rounded-2xl border border-white/20 shadow-2xl space-y-1 max-h-80 overflow-y-auto scrollbar-none">
          {models.map((m) => {
            const isSelected = currentModel?.modelKey === m.modelKey;
            return (
              <button
                key={m.id}
                onClick={() => handleSelect(m)}
                className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all ${
                  isSelected ? 'bg-brand-cyan/10 border border-brand-cyan/40 text-white' : 'hover:bg-white/5 text-text-secondary hover:text-white'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">{m.modelName}</span>
                    {m.supportsVision && <Eye className="w-3 h-3 text-cyan-400" title="Vision Supported" />}
                    {m.supportsAudio && <Mic className="w-3 h-3 text-violet-400" title="Audio Supported" />}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-text-muted mt-1 font-mono">
                    <span>Context: {(m.contextWindow / 1000).toFixed(0)}k tokens</span>
                    <span>•</span>
                    <span>${m.inputCostPer1k}/1k input</span>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-brand-cyan shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
