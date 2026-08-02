import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';

export const DocumentViewer: React.FC = () => {
  const documents = [
    { title: 'NexoApps_v5_Architecture_Spec.pdf', type: 'pdf', size: '2.45 MB', chunks: 142, status: 'indexed' },
    { title: 'Security_Audit_Report_2026.docx', type: 'docx', size: '1.28 MB', chunks: 85, status: 'indexed' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Indexed Knowledge Document Viewer</h3>
      <div className="space-y-3">
        {documents.map((d) => (
          <div key={d.title} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-brand-cyan" />
              <div>
                <h4 className="font-mono text-xs font-bold text-white">{d.title}</h4>
                <p className="text-[10px] text-text-muted font-mono mt-0.5">{d.size} • {d.chunks} Chunks</p>
              </div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        ))}
      </div>
    </div>
  );
};
