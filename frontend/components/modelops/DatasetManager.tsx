import React, { useState, useEffect } from 'react';
import { Database, Plus } from 'lucide-react';
import { datasetService } from '../../services/datasetService';
import { Dataset } from '../../../shared/types';

export const DatasetManager: React.FC = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);

  useEffect(() => {
    datasetService.getDatasets().then(setDatasets);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">ML Datasets & Annotations Manager</h2>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Dataset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {datasets.map(d => (
          <div key={d.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="font-semibold text-white text-lg flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-emerald-400" /> {d.datasetName || d.name}
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Type: {d.datasetType || d.category} | Rows: {(d.numRows || 0).toLocaleString()} | Size: {(((d.sizeBytes || 0) / 1024 / 1024) || d.sizeMb || 0).toFixed(0)} MB
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
