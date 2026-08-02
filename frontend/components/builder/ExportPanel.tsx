import React, { useState } from 'react';
import { exportAIProject } from '../../services/exportService';
import { DownloadCloud, Check, FileArchive, Layers } from 'lucide-react';

interface ExportPanelProps {
  projectId?: string;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ projectId = 'aip-101' }) => {
  const [format, setFormat] = useState<'ZIP' | 'Next.js' | 'React' | 'Node.js'>('Next.js');
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    setExported(false);
    try {
      await exportAIProject(projectId, format);
      setExported(true);
      setTimeout(() => setExported(false), 4000);
    } catch {
      alert('Export failed.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6 text-left shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <DownloadCloud className="w-5 h-5 text-brand-cyan" />
        <h3 className="text-base font-extrabold text-white">Project Export Package Studio</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        {(['Next.js', 'React', 'Node.js', 'ZIP'] as const).map((fmt) => (
          <button
            key={fmt}
            type="button"
            onClick={() => setFormat(fmt)}
            className={`p-4 rounded-2xl border transition-all text-left space-y-1 ${
              format === fmt
                ? 'border-brand-cyan/40 bg-brand-cyan/10 font-bold text-white shadow-glow-cyan'
                : 'border-white/10 text-text-secondary hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileArchive className="w-4 h-4 text-brand-cyan" />
              <span>{fmt} Package</span>
            </div>
            <p className="text-[10px] text-text-muted">Export as ready-to-run {fmt} codebase</p>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleExport}
        disabled={isExporting}
        className="w-full py-3.5 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet hover:shadow-glow-cyan flex items-center justify-center gap-2 transition-all"
      >
        {exported ? (
          <>
            <Check className="w-4 h-4 text-slate-950" />
            <span>Export Package Ready! Download Started</span>
          </>
        ) : (
          <>
            <DownloadCloud className="w-4 h-4" />
            <span>{isExporting ? 'Building Export Package...' : `Export Complete ${format} Project`}</span>
          </>
        )}
      </button>
    </div>
  );
};
