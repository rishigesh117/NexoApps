import React from 'react';
import { Layout, Bot, Image as ImageIcon, Sparkles, Move, Trash2, Edit3 } from 'lucide-react';
import { ApplicationComponent } from '../../../shared/types';

interface VisualCanvasProps {
  components: ApplicationComponent[];
  selectedId?: string;
  onSelectComponent: (comp: ApplicationComponent) => void;
}

export const VisualCanvas: React.FC<VisualCanvasProps> = ({ components, selectedId, onSelectComponent }) => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 h-full flex flex-col justify-between overflow-y-auto scrollbar-none relative">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <span className="text-xs font-bold text-white flex items-center gap-2">
          <Layout className="w-4 h-4 text-brand-cyan" />
          Interactive Drag & Drop Canvas
        </span>
        <span className="text-[10px] text-text-muted font-mono">12-Column Responsive Layout</span>
      </div>

      <div className="flex-1 my-4 space-y-4">
        {components.map((comp) => {
          const isSelected = selectedId === comp.id;
          return (
            <div
              key={comp.id}
              onClick={() => onSelectComponent(comp)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative group ${
                isSelected
                  ? 'bg-brand-cyan/15 border-brand-cyan shadow-glow-cyan'
                  : 'bg-surface-100/80 border-white/10 hover:border-brand-cyan/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Move className="w-4 h-4 text-text-muted group-hover:text-brand-cyan transition-colors" />
                  <span className="text-xs font-bold text-white">{comp.name}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-brand-cyan">
                  {comp.componentType}
                </span>
              </div>

              {/* Component Mock Preview */}
              <div className="p-3 rounded-xl bg-background/60 border border-white/5 text-xs text-text-muted space-y-2 font-mono">
                <p>Configured props: {JSON.stringify(comp.props)}</p>
                <div className="h-2 rounded-full bg-brand-cyan/20 w-3/4 animate-pulse" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
