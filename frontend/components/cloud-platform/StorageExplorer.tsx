import React, { useState, useEffect } from 'react';
import { HardDrive, Database, Folder } from 'lucide-react';
import { storageService } from '../../services/storageService';
import { StorageVolume, StorageBucket } from '../../../shared/types';

export const StorageExplorer: React.FC = () => {
  const [volumes, setVolumes] = useState<StorageVolume[]>([]);
  const [buckets, setBuckets] = useState<StorageBucket[]>([]);

  useEffect(() => {
    storageService.getVolumes().then(setVolumes);
    storageService.getBuckets().then(setBuckets);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Storage Volume & Object Bucket Explorer</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-blue-400" /> Block Storage NVMe Volumes
          </h3>
          {volumes.map(v => (
            <div key={v.id} className="p-3 bg-slate-900/60 rounded-lg flex justify-between items-center text-sm">
              <span className="text-white font-medium">{v.name}</span>
              <span className="text-slate-400 font-mono">{v.sizeGb} GB ({v.volumeType})</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" /> S3 Object Storage Buckets
          </h3>
          {buckets.map(b => (
            <div key={b.id} className="p-3 bg-slate-900/60 rounded-lg flex justify-between items-center text-sm">
              <span className="text-white font-medium">{b.bucketName}</span>
              <span className="text-slate-400 font-mono">{b.storageClass}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
