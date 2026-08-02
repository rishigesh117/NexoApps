import React from 'react';
import { Upload, FileText, CheckCircle2 } from 'lucide-react';

export const KnowledgeUploader: React.FC = () => {
  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Document Processing & Chunk Ingestion</h3>
      <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center space-y-3 bg-surface-100/50 hover:bg-surface-100 transition-colors cursor-pointer">
        <Upload className="w-8 h-8 text-brand-cyan mx-auto" />
        <div>
          <p className="text-xs font-bold text-white">Drag and drop PDF, DOCX, MD, or TXT documents here</p>
          <p className="text-[10px] text-text-muted mt-0.5">Automated document parsing, token chunking, and embedding generation</p>
        </div>
      </div>
    </div>
  );
};
