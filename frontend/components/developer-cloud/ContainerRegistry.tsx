import React, { useState, useEffect } from 'react';
import { Boxes, ShieldCheck } from 'lucide-react';
import { containerRegistryService } from '../../services/containerRegistryService';
import { ContainerImage } from '../../../shared/types';

export const ContainerRegistry: React.FC = () => {
  const [images, setImages] = useState<ContainerImage[]>([]);

  useEffect(() => {
    containerRegistryService.getImages().then(setImages);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Private OCI Container Registry & Vulnerability Scanner</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map(img => (
          <div key={img.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                <Boxes className="w-5 h-5 text-cyan-400" /> {img.imageName}
              </h3>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> Scanned</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">Tag: {img.tag} | Size: {(img.sizeBytes / 1024 / 1024).toFixed(0)} MB</p>
          </div>
        ))}
      </div>
    </div>
  );
};
