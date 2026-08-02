import React, { useState } from 'react';
import { GeneratedFile } from '../../types';
import { FileCode, Folder, Copy, Check } from 'lucide-react';

interface GeneratedFilesExplorerProps {
  files: GeneratedFile[];
}

export const GeneratedFilesExplorer: React.FC<GeneratedFilesExplorerProps> = ({ files }) => {
  const [selectedFile, setSelectedFile] = useState<GeneratedFile | null>(files[0] || null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (selectedFile) {
      navigator.clipboard.writeText(selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden flex flex-col md:flex-row h-96 text-left shadow-2xl">
      {/* File Tree */}
      <div className="w-full md:w-64 bg-slate-900/80 border-r border-white/10 p-4 space-y-2 overflow-y-auto">
        <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-white/10">
          <Folder className="w-4 h-4 text-brand-cyan" /> Project Files Tree
        </h4>
        <div className="space-y-1">
          {files.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedFile(f)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 transition-all ${
                selectedFile?.id === f.id
                  ? 'bg-brand-cyan/20 text-brand-cyan font-bold border border-brand-cyan/30'
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{f.filePath}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Code Editor Preview */}
      <div className="flex-1 bg-slate-950 p-4 flex flex-col justify-between overflow-hidden">
        {selectedFile ? (
          <>
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <span className="text-xs font-mono font-bold text-brand-cyan">{selectedFile.filePath}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold flex items-center gap-1 transition-all"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="flex-1 font-mono text-xs text-emerald-400 overflow-auto p-3 rounded-xl bg-slate-900 border border-white/5 leading-relaxed">
              {selectedFile.content}
            </pre>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-xs text-text-muted">
            Select a file to inspect generated code
          </div>
        )}
      </div>
    </div>
  );
};
