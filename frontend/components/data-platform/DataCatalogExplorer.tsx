import React, { useState, useEffect } from 'react';
import { Database, Search } from 'lucide-react';
import { lakehouseService } from '../../services/lakehouseService';
import { DataCatalog } from '../../../shared/types';

export const DataCatalogExplorer: React.FC = () => {
  const [catalog, setCatalog] = useState<DataCatalog[]>([]);

  useEffect(() => {
    lakehouseService.getCatalog().then(setCatalog);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">AI Data Catalog & Schema Discovery</h2>
      <div className="space-y-4 max-w-4xl">
        {catalog.map(c => (
          <div key={c.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-white font-mono text-base">{c.tableName}</h3>
              <span className="text-xs text-slate-400 font-bold">{c.recordCount.toLocaleString()} Records</span>
            </div>
            <p className="text-xs font-mono text-cyan-400 bg-slate-900/60 p-2.5 rounded border border-slate-700/60">{c.schemaDefinition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
