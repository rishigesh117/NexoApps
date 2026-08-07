import React, { useEffect, useState } from 'react';
import { HardDrive, Folder, File, CheckCircle2 } from 'lucide-react';
import { getStorageData } from '../../services/storageService';
import { StorageBucket, StorageObject } from '../../../shared/types';

export const StorageExplorer: React.FC = () => {
  const [data, setData] = useState<{ buckets: StorageBucket[]; objects: StorageObject[] }>({ buckets: [], objects: [] });

  useEffect(() => {
    getStorageData().then(setData);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <HardDrive className="w-6 h-6 text-brand-cyan" /> Enterprise Object Storage Explorer
        </h2>
        <p className="text-text-muted text-sm">S3-compatible bucket explorer, artifact storage & upload management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Folder className="w-5 h-5 text-amber-400" /> Active Buckets
          </h3>
          <div className="space-y-2">
            {data.buckets.map((b) => (
              <div key={b.id} className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white text-sm">{b.bucketName}</h4>
                  <span className="text-xs text-text-muted">Region: {b.region}</span>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg">Active</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <File className="w-5 h-5 text-brand-cyan" /> Recent Objects
          </h3>
          <div className="space-y-2">
            {data.objects.map((o) => (
              <div key={o.id} className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white text-xs font-mono">{o.objectKey}</h4>
                  <span className="text-xs text-text-muted">{(o.sizeBytes / (1024 * 1024)).toFixed(1)} MB • {o.contentType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
