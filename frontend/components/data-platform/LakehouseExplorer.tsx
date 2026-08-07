import React, { useState, useEffect } from 'react';
import { HardDrive, Database } from 'lucide-react';
import { lakehouseService } from '../../services/lakehouseService';
import { DataLakehouse } from '../../../shared/types';

export const LakehouseExplorer: React.FC = () => {
  const [lakehouses, setLakehouses] = useState<DataLakehouse[]>([]);

  useEffect(() => {
    lakehouseService.getLakehouses().then(setLakehouses);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Enterprise Data Lakehouse Explorer</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lakehouses.map(l => (
          <div key={l.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-emerald-400" /> {l.name}
              </h3>
              <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs uppercase font-semibold">{l.format}</span>
            </div>
            <p className="text-xs font-mono text-slate-400 mb-2">{l.storageLocation}</p>
            <div className="text-sm font-bold text-white">{l.totalSizeGb.toLocaleString()} GB Total Storage</div>
          </div>
        ))}
      </div>
    </div>
  );
};
