import React, { useState, useEffect } from 'react';
import { Package, Download } from 'lucide-react';
import { artifactService } from '../../services/artifactService';
import { Artifact } from '../../../shared/types';

export const ArtifactRegistry: React.FC = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);

  useEffect(() => {
    artifactService.getArtifacts().then(setArtifacts);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Build Artifact & Package Registry</h2>
      <div className="space-y-4 max-w-4xl">
        {artifacts.map(a => (
          <div key={a.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="font-semibold text-white">{a.artifactName}</h3>
                <p className="text-xs text-slate-400 font-mono">Size: {(a.fileSize / 1024 / 1024).toFixed(1)} MB</p>
              </div>
            </div>
            <a href={a.downloadUrl} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold flex items-center gap-1">
              <Download className="w-3.5 h-3.5" /> Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
