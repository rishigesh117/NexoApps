import React, { useState, useEffect } from 'react';
import { Database, Plus, CheckCircle2 } from 'lucide-react';
import { dataPlatformService } from '../../services/dataPlatformService';
import { DataSource } from '../../../shared/types';

export const DataSourceManager: React.FC = () => {
  const [sources, setSources] = useState<DataSource[]>([]);

  useEffect(() => {
    dataPlatformService.getDataSources().then(setSources);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Enterprise Data Source Manager</h2>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Connect New Data Source
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sources.map(s => (
          <div key={s.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <Database className="w-6 h-6 text-emerald-400" />
              <h3 className="font-semibold text-white">{s.name}</h3>
            </div>
            <p className="text-xs text-slate-400 font-mono mb-4 line-clamp-1">{s.connectionUrl}</p>
            <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold flex items-center gap-1 w-fit">
              <CheckCircle2 className="w-3.5 h-3.5" /> {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
