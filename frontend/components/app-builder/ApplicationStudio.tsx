import React, { useState } from 'react';
import { Layout, Layers, Play, Rocket, Settings, Users, Sparkles, Plus, CheckCircle, RefreshCw } from 'lucide-react';
import { VisualCanvas } from './VisualCanvas';
import { ComponentPalette } from './ComponentPalette';
import { PropertyInspector } from './PropertyInspector';
import { LivePreview } from './LivePreview';
import { AIApplication, ApplicationComponent } from '../../../shared/types';

interface ApplicationStudioProps {
  application?: AIApplication;
}

export const ApplicationStudio: React.FC<ApplicationStudioProps> = ({ application }) => {
  const [activeTab, setActiveTab] = useState<'canvas' | 'preview' | 'settings'>('canvas');
  const [components, setComponents] = useState<ApplicationComponent[]>([
    { id: 'c-1', applicationId: application?.id || 'app-demo-1', componentType: 'chatbot_builder', name: 'Support Copilot Bot', props: { modelKey: 'gpt-4o' }, layoutPosition: { x: 0, y: 0, w: 12, h: 6 }, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'c-2', applicationId: application?.id || 'app-demo-1', componentType: 'image_gen_block', name: 'Banner Generator', props: { style: 'vivid' }, layoutPosition: { x: 0, y: 6, w: 6, h: 4 }, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  ]);
  const [selectedComponent, setSelectedComponent] = useState<ApplicationComponent | null>(components[0]);

  const handleAddComponent = (type: string, name: string) => {
    const newComp: ApplicationComponent = {
      id: `c-${Date.now()}`,
      applicationId: application?.id || 'app-demo-1',
      componentType: type,
      name,
      props: { modelKey: 'gpt-4o' },
      layoutPosition: { x: 0, y: components.length * 4, w: 6, h: 4 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setComponents([...components, newComp]);
    setSelectedComponent(newComp);
  };

  return (
    <div className="space-y-4">
      {/* Studio Header Bar */}
      <div className="glass-panel p-4 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-cyan via-brand-blue to-brand-violet p-0.5 shadow-glow-cyan">
            <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center">
              <Layout className="w-5 h-5 text-brand-cyan" />
            </div>
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              {application?.name || 'Enterprise Customer Copilot'}
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan font-mono">
                v{application?.version || '1.2.0'}
              </span>
            </h2>
            <p className="text-[11px] text-text-muted">Visual Low-Code Studio Session • Live Auto-Save Active</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('canvas')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'canvas' ? 'bg-brand-cyan text-slate-950 shadow-glow-cyan' : 'bg-surface-100 border border-white/10 text-text-secondary'
            }`}
          >
            Visual Canvas
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'preview' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-surface-100 border border-white/10 text-text-secondary'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {/* Main Studio Split */}
      {activeTab === 'canvas' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[680px]">
          <div className="lg:col-span-3 h-full">
            <ComponentPalette onSelectType={handleAddComponent} />
          </div>
          <div className="lg:col-span-6 h-full">
            <VisualCanvas
              components={components}
              selectedId={selectedComponent?.id}
              onSelectComponent={(c) => setSelectedComponent(c)}
            />
          </div>
          <div className="lg:col-span-3 h-full">
            <PropertyInspector component={selectedComponent} />
          </div>
        </div>
      ) : (
        <LivePreview components={components} />
      )}
    </div>
  );
};
