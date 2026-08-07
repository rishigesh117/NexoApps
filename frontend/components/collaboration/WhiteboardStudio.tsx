import React, { useState } from 'react';
import { Activity, Plus, Square, StickyNote, Type, Image as ImageIcon } from 'lucide-react';

export const WhiteboardStudio: React.FC = () => {
  const [stickies, setStickies] = useState([
    { id: 'st-1', text: 'Phase 11D Whiteboard Studio Active', color: 'bg-amber-400/20 text-amber-300 border-amber-400/40', x: 20, y: 30 },
    { id: 'st-2', text: 'Real-time spatial visual canvas & sticky notes', color: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/40', x: 250, y: 30 }
  ]);

  const addSticky = () => {
    setStickies((prev) => [
      ...prev,
      { id: `st-${Date.now()}`, text: 'New Collaboration Sticky', color: 'bg-purple-400/20 text-purple-300 border-purple-400/40', x: 100, y: 150 }
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-brand-cyan" /> Whiteboard Studio
          </h2>
          <p className="text-text-muted text-sm">Interactive team whiteboards & visual brainstorming studio</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={addSticky} className="px-3 py-1.5 bg-brand-cyan text-background font-semibold rounded-lg text-xs flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Add Sticky
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 h-[450px] relative overflow-hidden bg-background/50">
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/10">
          <button className="p-1.5 text-text-muted hover:text-white transition"><StickyNote className="w-4 h-4" /></button>
          <button className="p-1.5 text-text-muted hover:text-white transition"><Square className="w-4 h-4" /></button>
          <button className="p-1.5 text-text-muted hover:text-white transition"><Type className="w-4 h-4" /></button>
          <button className="p-1.5 text-text-muted hover:text-white transition"><ImageIcon className="w-4 h-4" /></button>
        </div>

        {stickies.map((s) => (
          <div
            key={s.id}
            style={{ left: `${s.x}px`, top: `${s.y}px` }}
            className={`absolute p-4 rounded-xl border ${s.color} w-48 shadow-lg font-medium text-xs leading-relaxed`}
          >
            {s.text}
          </div>
        ))}
      </div>
    </div>
  );
};
