import React, { useState } from 'react';
import { Terminal, Save, Check } from 'lucide-react';

export const CodeEditor: React.FC = () => {
  const [code, setCode] = useState(`import express from 'express';\n\nconst app = express();\napp.use(express.json());\n\napp.get('/api/v1/health', (req, res) => {\n  res.json({ status: 'ok', timestamp: new Date().toISOString() });\n});\n\napp.listen(5000, () => console.log('Fintech Engine running on port 5000'));`);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <span className="text-xs font-mono text-brand-cyan flex items-center gap-2">
          <Terminal className="w-4 h-4" /> src/index.ts (TypeScript)
        </span>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-xl bg-brand-cyan text-slate-950 font-bold text-xs shadow-glow-cyan flex items-center gap-1.5"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved' : 'Save File'}</span>
        </button>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={14}
        className="w-full p-4 rounded-2xl bg-background/90 border border-white/10 text-white font-mono text-xs focus:border-brand-cyan focus:outline-none leading-relaxed"
      />
    </div>
  );
};
