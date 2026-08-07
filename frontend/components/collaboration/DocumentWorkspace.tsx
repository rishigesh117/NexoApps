import React, { useEffect, useState } from 'react';
import { FileText, Upload, HardDrive, Download, Eye } from 'lucide-react';
import { getSharedDocuments } from '../../services/documentService';
import { SharedDocument } from '../../../shared/types';

export const DocumentWorkspace: React.FC = () => {
  const [documents, setDocuments] = useState<SharedDocument[]>([]);

  useEffect(() => {
    getSharedDocuments().then(setDocuments);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HardDrive className="w-6 h-6 text-brand-cyan" /> Document Workspace & Libraries
          </h2>
          <p className="text-text-muted text-sm">Version-controlled document management & team file sharing</p>
        </div>
        <button className="px-4 py-2 bg-brand-cyan text-background font-semibold rounded-xl text-sm hover:opacity-90 transition flex items-center gap-2">
          <Upload className="w-4 h-4" /> Upload Document
        </button>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">{doc.title}</h4>
                <p className="text-text-muted text-xs">Owner: {doc.ownerId} • Format: {doc.fileType.toUpperCase()} • Permissions: {doc.permissions}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 bg-brand-cyan/20 text-brand-cyan rounded-lg hover:bg-brand-cyan/30 transition">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
